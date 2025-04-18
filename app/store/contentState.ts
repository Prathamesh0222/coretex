import { create } from "zustand";

export enum ContentType {
  YOUTUBE = "YOUTUBE",
  TWITTER = "TWITTER",
  SPOTIFY = "SPOTIFY",
}

interface ContentStateProps {
  isPreview: string;
  title: string;
  link: string;
  type: ContentType;
  tags: string[];
  setIsPreview: (e: string) => void;
  setTitle: (e: string) => void;
  setLink: (e: string) => void;
  setType: (e: ContentType) => void;
  setTags: (e: string[]) => void;
}

export const useContentState = create<ContentStateProps>((set) => ({
  isPreview: "",
  title: "",
  link: "",
  type: ContentType.YOUTUBE,
  tags: [],
  setIsPreview: (isPreview) => set({ isPreview }),
  setTitle: (title) => set({ title }),
  setType: (type) => set({ type }),
  setLink: (link) => set({ link }),
  setTags: (tags) => set({ tags }),
}));
