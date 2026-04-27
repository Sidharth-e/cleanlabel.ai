"use client";

import { AnalysisResult } from "@/types/analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, Info, Sparkles, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface ResultViewProps {
  result: AnalysisResult;
}

export function ResultView({ result }: ResultViewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "safe": return "bg-success/10 text-success border-success/20";
      case "low": return "bg-info/10 text-info border-info/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Score Header */}
      <Card className="bg-card/50 backdrop-blur-md border-primary/10 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={364.4}
                  initial={{ strokeDashoffset: 364.4 }}
                  animate={{ strokeDashoffset: 364.4 - (364.4 * result.score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={getScoreColor(result.score)}
                />
              </svg>
              <span className={`absolute text-3xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h2 className="text-3xl font-bold text-foreground">{result.productName}</h2>
              <p className="text-lg text-muted-foreground">{result.summary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients Analysis */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" /> Ingredient Breakdown
          </h3>
          <div className="space-y-3">
            {result.ingredients.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-card/30 border-muted-foreground/5">
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.name}</span>
                        <Badge variant="outline" className={getRiskColor(item.riskLevel)}>
                          {item.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Clean Alternatives */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Better Alternatives
          </h3>
          <div className="space-y-4">
            {result.alternatives.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer group">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
