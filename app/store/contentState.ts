import { create } from "zustand";

interface ContentStateProps {
  isPreview: string;
  setIsPreview: (e: string) => void;
}

export const useContentState = create<ContentStateProps>((set) => ({
  isPreview: "",
  setIsPreview: (isPreview) => set({ isPreview }),
}));
