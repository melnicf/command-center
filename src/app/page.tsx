import Image from "next/image";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { FullscreenToggle } from "@/components/shared/fullscreen-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header - Fixed */}
      <header className="shrink-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Image
              src="/INVNT logo.png"
              alt="INVNT"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-bold gradient-primary-text">Command Center</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <FullscreenToggle />
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Phase 2: Theme & Design System ✓
            </Badge>
            <h1 className="mb-4 gradient-primary-text animate-gradient">
              Command Center
            </h1>
            <p className="lead mb-8">
              A modern command center application for organizational workspace management.
              Toggle between dark and light themes, or enter fullscreen mode for a desktop-app experience.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="glow-purple">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Color Palette Demo */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="mb-8 text-center">Color Palette</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Primary */}
            <Card className="overflow-hidden">
              <div className="h-24 bg-primary" />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Primary</CardTitle>
                <CardDescription>Rich Violet</CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-sm text-muted-foreground">--primary</code>
              </CardContent>
            </Card>

            {/* Accent */}
            <Card className="overflow-hidden">
              <div className="h-24 bg-accent" />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Accent</CardTitle>
                <CardDescription>Bright Purple</CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-sm text-muted-foreground">--accent</code>
              </CardContent>
            </Card>

            {/* Glow */}
            <Card className="overflow-hidden">
              <div className="h-24 bg-glow" />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Glow</CardTitle>
                <CardDescription>Magenta Accent</CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-sm text-muted-foreground">--glow</code>
              </CardContent>
            </Card>

            {/* Neon */}
            <Card className="overflow-hidden">
              <div className="h-24 bg-neon" />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Neon</CardTitle>
                <CardDescription>Electric Purple</CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-sm text-muted-foreground">--neon</code>
              </CardContent>
            </Card>
          </div>

          {/* Semantic Colors */}
          <h3 className="mb-4 mt-12">Semantic Colors</h3>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-success text-success-foreground">Success</Badge>
            <Badge className="bg-warning text-warning-foreground">Warning</Badge>
            <Badge className="bg-destructive text-destructive-foreground">Destructive</Badge>
            <Badge className="bg-info text-info-foreground">Info</Badge>
          </div>
        </section>

        {/* Typography Demo */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="mb-8 text-center">Typography Scale</h2>
          
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <span className="muted">h1</span>
                <h1>Heading One</h1>
              </div>
              <div>
                <span className="muted">h2</span>
                <h2>Heading Two</h2>
              </div>
              <div>
                <span className="muted">h3</span>
                <h3>Heading Three</h3>
              </div>
              <div>
                <span className="muted">h4</span>
                <h4>Heading Four</h4>
              </div>
              <div>
                <span className="muted">h5</span>
                <h5>Heading Five</h5>
              </div>
              <div>
                <span className="muted">h6</span>
                <h6>Heading Six</h6>
              </div>
              <div>
                <span className="muted">paragraph</span>
                <p>
                  This is a paragraph of body text. The quick brown fox jumps over the lazy dog.
                  Typography is set using the Geist font family for a modern, clean look.
                </p>
              </div>
              <div>
                <span className="muted">lead</span>
                <p className="lead">
                  This is lead text, perfect for introductions and summaries.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Button & Component Demo */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="mb-8 text-center">Components</h2>
          
          <Card className="p-8">
            <h3 className="mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            
            <h3 className="mb-6 mt-8">Buttons with Glow</h3>
            <div className="flex flex-wrap gap-4">
              <Button className="glow-purple-sm">Small Glow</Button>
              <Button className="glow-purple">Medium Glow</Button>
              <Button className="glow-purple-lg">Large Glow</Button>
              <Button className="glow-purple animate-glow">Animated Glow</Button>
            </div>

            <h3 className="mb-6 mt-8">Gradient</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button className="gradient-primary border-0 text-white">Gradient Button</Button>
              <span className="gradient-primary-text text-2xl font-bold animate-gradient">
                Gradient Text
              </span>
            </div>
          </Card>
        </section>

        {/* Glassmorphism Demo */}
        <section className="container mx-auto px-4 py-8 pb-16">
          <h2 className="mb-8 text-center">Effects</h2>
          
          <div className="relative rounded-xl gradient-primary p-12">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass rounded-xl p-6">
                <h4 className="mb-2 text-white">Glassmorphism</h4>
                <p className="text-white/80">
                  Frosted glass effect with backdrop blur, perfect for overlays and sidebars.
                </p>
              </div>
              <div className="glass-purple rounded-xl p-6">
                <h4 className="mb-2 text-white">Glass Purple</h4>
                <p className="text-white/80">
                  Purple-tinted glassmorphism matching the INVNT brand aesthetic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop App Note */}
        <section className="container mx-auto px-4 py-8 pb-16">
          <Card className="p-8 border-primary/30 bg-primary/5">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-primary/10">
                <Image
                  src="/INVNT logo.png"
                  alt="INVNT"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="mb-2">Desktop App Experience</h3>
                <p className="text-muted-foreground">
                  This command center is designed to feel like a native desktop application. 
                  Use the <strong>fullscreen button</strong> in the header (or press <kbd className="px-2 py-1 bg-muted rounded text-xs">F11</kbd>) 
                  to enter presentation mode. The interface is optimized for immersive, OS-like interactions.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Footer - Fixed */}
      <footer className="shrink-0 border-t border-border/50 py-3 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="muted text-xs">
            INVNT Command Center • Phase 2: Theme & Design System Complete
          </p>
        </div>
      </footer>
    </main>
  );
}
