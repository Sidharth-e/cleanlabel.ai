import { MainContent } from "@/components/home/main-content";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background px-4 py-12 md:py-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Hero Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Decipher Your <span className="text-primary">Label.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            Upload a photo or paste a URL. Our agent identifies hidden additives,
            scores the product, and finds 100% natural alternatives.
          </p>
        </div>

        {/* Main Agentic Interface */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <MainContent />
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] bg-tertiary/5 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
