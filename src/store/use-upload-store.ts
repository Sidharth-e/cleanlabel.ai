import { create } from "zustand";

interface UploadState {
  file: File | null;
  previewUrl: string | null;
  textInput: string;
  isAnalyzing: boolean;
  setFile: (file: File | null) => void;
  setTextInput: (text: string) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  previewUrl: null,
  textInput: "",
  isAnalyzing: false,
  setFile: (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      set({ file, previewUrl: url, textInput: "" });
    } else {
      set({ file: null, previewUrl: null });
    }
  },
  setTextInput: (textInput) => set({ textInput, file: null, previewUrl: null }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () => set({ file: null, previewUrl: null, textInput: "", isAnalyzing: false }),
}));
