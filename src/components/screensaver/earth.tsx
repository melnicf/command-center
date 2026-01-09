"use client";

import * as React from "react";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface EarthProps {
  radius?: number;
}

// NASA Blue Marble and Black Marble texture URLs (public domain)
// Using reliable CDN sources for NASA's imagery
const TEXTURE_URLS = {
  // Day texture - NASA Blue Marble
  day: "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg",
  // Night texture - NASA Black Marble (city lights)  
  night: "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg",
};

// Calculate sun position based on current time
function getSunDirection(date: Date): THREE.Vector3 {
  // Get hours in UTC
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60;
  
  // Sun is at longitude 0 at 12:00 UTC (noon)
  // The sun moves 15 degrees per hour (360/24)
  const sunLongitude = ((12 - utcHours) * 15) * (Math.PI / 180);
  
  // Approximate sun declination based on day of year
  // Simplified calculation (ranges from -23.5 to +23.5 degrees)
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const declination = 23.5 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365) * (Math.PI / 180);
  
  // Convert to Cartesian coordinates
  const x = Math.cos(declination) * Math.sin(sunLongitude);
  const y = Math.sin(declination);
  const z = Math.cos(declination) * Math.cos(sunLongitude);
  
  return new THREE.Vector3(x, y, z).normalize();
}

// Custom shader for day/night Earth
const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDirection;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 dayColor = texture2D(dayMap, vUv).rgb;
    vec3 nightColor = texture2D(nightMap, vUv).rgb;
    
    // Boost the day texture brightness
    dayColor = dayColor * 1.4;
    
    // Boost the night lights significantly (city lights are dim in source)
    nightColor = nightColor * 3.0;
    
    // Calculate how much this point faces the sun
    float sunIntensity = dot(vNormal, sunDirection);
    
    // Smooth transition between day and night (terminator)
    float transition = smoothstep(-0.15, 0.3, sunIntensity);
    
    // Mix day and night colors
    vec3 color = mix(nightColor, dayColor, transition);
    
    // Add ambient light to make the dark side more visible
    vec3 ambient = dayColor * 0.15;
    color = max(color, ambient);
    
    // Add atmosphere glow on the edges (rim lighting)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    rim = pow(rim, 3.0);
    vec3 atmosphereColor = vec3(0.4, 0.7, 1.0) * rim * 0.5;
    
    // Add extra glow on the sunlit side
    float sunGlow = max(sunIntensity, 0.0);
    atmosphereColor += vec3(0.3, 0.5, 0.8) * rim * sunGlow * 0.3;
    
    gl_FragColor = vec4(color + atmosphereColor, 1.0);
  }
`;

export function Earth({ radius = 2 }: EarthProps) {
  const earthRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load NASA textures using drei's useTexture (better error handling)
  const textures = useTexture({
    day: TEXTURE_URLS.day,
    night: TEXTURE_URLS.night,
  });
  
  // Configure textures
  useEffect(() => {
    Object.values(textures).forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
    });
  }, [textures]);
  
  // Shader material with day/night cycle
  const shaderMaterial = useMemo(() => {
    const sunDir = getSunDirection(new Date());
    return new THREE.ShaderMaterial({
      uniforms: {
        dayMap: { value: textures.day },
        nightMap: { value: textures.night },
        sunDirection: { value: sunDir },
      },
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
    });
  }, [textures]);
  
  // Animation frame - rotate Earth and update sun position
  useFrame((state, delta) => {
    if (earthRef.current) {
      // Earth rotates once every 24 hours
      // For visual effect, we'll speed this up slightly but keep it realistic feeling
      // Real rotation: 360 degrees / 86400 seconds = 0.00417 deg/sec
      // Screensaver speed: about 10x faster for visual interest
      earthRef.current.rotation.y += delta * 0.05;
    }
    
    // Update sun direction every frame (for real-time day/night)
    if (shaderRef.current) {
      const sunDir = getSunDirection(new Date());
      shaderRef.current.uniforms.sunDirection.value = sunDir;
    }
  });
  
  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <primitive object={shaderMaterial} ref={shaderRef} attach="material" />
      </mesh>
    </group>
  );
}
