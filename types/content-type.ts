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

interface ContentTag {
  contentId: string;
  tagsId: string;
  tags: {
    id: string;
    title: string;
  };
}

interface NotesTag {
  notesId: string;
  tagsId: string;
  tags: {
    id: string;
    title: string;
  };
}

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  summary: string;
  link: string;
  createdAt: string;
  ContentTags: ContentTag[];
  spacesId?: string | null;
}

export interface Notes {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  NotesTags: NotesTag[];
  spacesId?: string | null;
}
