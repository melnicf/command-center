"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";

export default function SpaceNotFound() {
  return (
    <div className="h-dvh flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted mx-auto mb-6">
          <MapPin className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Space Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The space you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Spaces
          </Link>
        </Button>
      </div>
    </div>
  );
}
