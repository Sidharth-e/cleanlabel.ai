import { create } from "zustand";

interface UploadState {
  file: File | null;
  previewUrl: string | null;
  urlInput: string;
  textInput: string;
  isAnalyzing: boolean;
  setFile: (file: File | null) => void;
  setUrlInput: (url: string) => void;
  setTextInput: (text: string) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  previewUrl: null,
  urlInput: "",
  textInput: "",
  isAnalyzing: false,
  setFile: (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      set({ file, previewUrl: url, urlInput: "", textInput: "" });
    } else {
      set({ file: null, previewUrl: null });
    }
  },
  setUrlInput: (urlInput) => set({ urlInput, file: null, previewUrl: null, textInput: "" }),
  setTextInput: (textInput) => set({ textInput, file: null, previewUrl: null, urlInput: "" }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () => set({ file: null, previewUrl: null, urlInput: "", textInput: "", isAnalyzing: false }),
}));
