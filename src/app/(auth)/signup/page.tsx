import type { Metadata } from "next";
import { SignupForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign Up | INVNT Command Center",
  description: "Create your INVNT Command Center account",
};

export default function SignupPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Create an account</h2>
        <p className="text-muted-foreground">
          Get started with INVNT Command Center
        </p>
      </div>

      {/* Signup form */}
      <SignupForm />
    </div>
  );
}
