import { MainContent } from "@/components/home/main-content";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background px-4 py-12 md:py-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Hero Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Ingredient Detective</span>
          </div>
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 pt-12">
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-primary" />}
            title="Clean Label Scale"
            description="Proprietary scoring based on ultra-processed food research."
            delay="delay-400"
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Agentic Research"
            description="Autonomously researches obscure chemicals in real-time."
            delay="delay-500"
          />
          <FeatureCard 
            icon={<Sparkles className="w-6 h-6 text-primary" />}
            title="Better Swaps"
            description="Active web search to find chemical-free alternatives you'll love."
            delay="delay-600"
          />
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

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-card/30 border border-muted-foreground/10 backdrop-blur-sm space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 ${delay}`}>
      <div className="p-3 w-fit rounded-xl bg-primary/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
