"use client";

import * as React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Billboard } from "@react-three/drei";
import * as THREE from "three";

// INVNT Logo floating in space
export function FloatingLogo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/INVNT logo.png");
  
  // Orbit parameters
  const orbitRadius = 4.5;
  const orbitSpeed = 0.15;
  const floatAmplitude = 0.3;
  const floatSpeed = 1.5;
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Circular orbit around Earth
      meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      meshRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
      
      // Gentle vertical floating
      meshRef.current.position.y = Math.sin(time * floatSpeed) * floatAmplitude + 1;
      
      // Gentle rotation
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
  });
  
  return (
    <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
      <mesh ref={meshRef} position={[orbitRadius, 1, 0]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Billboard>
  );
}

// Bowie Badger flying around
export function FloatingBadger() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/bowie badger.webp");
  
  // Calculate aspect ratio from texture
  const aspectRatio = React.useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined;
    if (img && img.width && img.height) {
      return img.width / img.height;
    }
    return 1; // Default to square if image not loaded
  }, [texture]);
  
  // Size based on height, width calculated from aspect ratio
  const height = 1.5;
  const width = height * aspectRatio;
  
  // Different orbit parameters for variety
  const orbitRadius = 5.5;
  const orbitSpeed = 0.1;
  const orbitTilt = 0.4; // Tilted orbit
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Tilted elliptical orbit
      meshRef.current.position.x = Math.cos(time * orbitSpeed + Math.PI) * orbitRadius * 0.8;
      meshRef.current.position.z = Math.sin(time * orbitSpeed + Math.PI) * orbitRadius;
      meshRef.current.position.y = Math.sin(time * orbitSpeed * 2) * orbitRadius * orbitTilt - 0.5;
      
      // Wobble rotation like floating in zero-g
      meshRef.current.rotation.z = Math.sin(time * 0.8) * 0.15;
      meshRef.current.rotation.x = Math.cos(time * 0.6) * 0.1;
    }
  });
  
  return (
    <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
      <mesh ref={meshRef} position={[-orbitRadius, 0, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Billboard>
  );
}

// Small floating particles/debris for atmosphere
export function SpaceDebris() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;
  
  // Generate random positions for debris
  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      scale: 0.02 + Math.random() * 0.03,
      speed: 0.1 + Math.random() * 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        const time = state.clock.elapsedTime;
        
        // Gentle drifting motion
        child.position.x = particle.position[0] + Math.sin(time * particle.speed + particle.offset) * 0.5;
        child.position.y = particle.position[1] + Math.cos(time * particle.speed * 0.7 + particle.offset) * 0.3;
        child.position.z = particle.position[2] + Math.sin(time * particle.speed * 0.5 + particle.offset) * 0.5;
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}
