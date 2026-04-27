import { useMutation } from "@tanstack/react-query";
import { analyzeLabel } from "@/app/actions/analyze";
import { useUploadStore } from "@/store/use-upload-store";
import { AnalysisResult } from "@/types/analysis";

export function useAnalyze() {
  const { file, urlInput, textInput, setIsAnalyzing } = useUploadStore();

  return useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (urlInput) formData.append("url", urlInput);
      if (textInput) formData.append("text", textInput);

      setIsAnalyzing(true);
      try {
        const result = await analyzeLabel(formData);
        return result;
      } finally {
        setIsAnalyzing(false);
      }
    },
  });
}
