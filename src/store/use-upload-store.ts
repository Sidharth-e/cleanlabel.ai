import { create } from "zustand";

interface UploadState {
  file: File | null;
  previewUrl: string | null;
  urlInput: string;
  isAnalyzing: boolean;
  setFile: (file: File | null) => void;
  setUrlInput: (url: string) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  previewUrl: null,
  urlInput: "",
  isAnalyzing: false,
  setFile: (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      set({ file, previewUrl: url });
    } else {
      set({ file: null, previewUrl: null });
    }
  },
  setUrlInput: (urlInput) => set({ urlInput }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () => set({ file: null, previewUrl: null, urlInput: "", isAnalyzing: false }),
}));
