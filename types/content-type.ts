import { ContentType } from "@/store/contentState";

type SharedContent = {
  id: string;
  title: string;
  link: string;
  type: ContentType;
  userId: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  ContentTags: {
    tags: {
      id: string;
      title: string;
    };
  }[];
};

type SharedNote = {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  NotesTags: {
    tags: {
      id: string;
      title: string;
    };
  }[];
};

export type ShareData = {
  user: { username: string };
  contents: SharedContent[];
  notes: SharedNote[];
};
