import Image from "next/image";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { FullscreenToggle } from "@/components/shared/fullscreen-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative gradient-primary">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="mb-8">
            <Image
              src="/INVNT logo.png"
              alt="INVNT"
              width={120}
              height={120}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Command Center
          </h1>
          <p className="text-lg text-white/80 text-center max-w-md">
            Your centralized workspace for organizational management, powered by INVNT.
          </p>
          
          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-2 gap-6 w-full max-w-sm">
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <p className="text-sm text-white/90">13+ Spaces</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm text-white/90">50+ Apps</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-sm text-white/90">AI Assistant</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📅</div>
              <p className="text-sm text-white/90">Integrated Calendar</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col">
        {/* Header with theme toggle */}
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div className="lg:hidden flex items-center gap-3">
            <Image
              src="/INVNT logo.png"
              alt="INVNT"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-semibold gradient-primary-text">INVNT</span>
          </div>
          <div className="lg:flex-1 lg:flex lg:justify-end gap-2">
            <ThemeToggle />
            <FullscreenToggle />
          </div>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} INVNT. All rights reserved.
        </div>
      </div>
    </div>
  );
}
