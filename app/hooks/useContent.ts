import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ContentType } from "../store/contentState";

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
}

export interface Notes {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  NotesTags: NotesTag[];
}

export const useContent = () => {
  return useQuery<Array<Content | Notes>>({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await axios.get("/api/content");
      return response.data;
    },
  });
};
