import { useMutation } from "@tanstack/react-query";
import { analyzeLabel } from "@/app/actions/analyze";
import { useUploadStore } from "@/store/use-upload-store";

export function useAnalyze() {
  const { file, textInput, setIsAnalyzing } = useUploadStore();

  return useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (file) formData.append("file", file);
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
