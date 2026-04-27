"use client";

import { UploadSection } from "@/components/upload/upload-section";
import { ResultView } from "@/components/analysis/result-view";
import { useAnalyze } from "@/hooks/use-analyze";
import { useUploadStore } from "@/store/use-upload-store";
import { Button } from "@/components/ui/button";
import { Loader2, Search, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MainContent() {
  const { mutate, data, isPending, reset: resetMutation } = useAnalyze();
  const { file, urlInput, reset: resetStore } = useUploadStore();

  const handleAnalyze = () => {
    mutate();
  };

  const handleBack = () => {
    resetMutation();
    resetStore();
  };

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {!data ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <UploadSection />
            
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isPending || (!file && !urlInput)}
                className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Ingredients...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Detect Ingredients
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-start">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Upload
              </Button>
            </div>
            <ResultView result={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
