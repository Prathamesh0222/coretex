import { ContentType } from "@/store/contentState";

export interface ContentTag {
  contentId: string;
  tagsId: string;
  tags: {
    id: string;
    title: string;
  };
}

export interface NotesTag {
  notesId: string;
  tagsId: string;
  tags: {
    id: string;
    title: string;
  };
}

export interface SearchContent {
  id: string;
  title: string;
  type: ContentType;
  summary: string | null;
  link: string;
  createdAt: Date;
  ContentTags: ContentTag[];
  similarity: number;
  resultType: "content";
}

export interface SearchNote {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  NotesTags: NotesTag[];
  similarity: number;
  resultType: "notes";
}

export type SearchResult = SearchContent | SearchNote;

export interface SearchResponse {
  query: string;
  limit?: number;
}

export interface Message {
  id: string;
  type: "query" | "results";
  content: string;
  results?: SearchResult[];
  timestamp: string;
}
