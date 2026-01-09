"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, useSidebarStore } from "@/stores";
import { authService } from "@/services/auth";

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { openSidebar } = useSidebarStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    const success = await login({ email, password });

    if (success) {
      // Request fullscreen immediately after successful login
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
      
      // Open sidebar after successful login to welcome the user
      openSidebar();
      router.push("/");
    }
  };

  // Fill demo credentials
  const fillDemoCredentials = () => {
    const demo = authService.getDemoCredentials();
    setEmail(demo.email);
    setPassword(demo.password);
    setFormErrors({});
    clearError();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
          {error.message}
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
            }}
            className="pl-10"
            disabled={isLoading}
            autoComplete="email"
          />
        </div>
        {formErrors.email && (
          <p className="text-sm text-destructive">{formErrors.email}</p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formErrors.password) setFormErrors({ ...formErrors, password: undefined });
            }}
            className="pl-10 pr-10"
            disabled={isLoading}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {formErrors.password && (
          <p className="text-sm text-destructive">{formErrors.password}</p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full glow-purple"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      {/* Demo credentials button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={fillDemoCredentials}
        disabled={isLoading}
      >
        Use demo account
      </Button>

      {/* Sign up link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
