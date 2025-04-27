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

interface Content {
  id: string;
  title: string;
  type: ContentType;
  summary: string;
  link: string;
  createdAt: string;
  ContentTags: ContentTag[];
}

interface Notes {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  NotesTags: NotesTag[];
}

export const useContent = () => {
  return useQuery<{ content: Content[]; notes: Notes[] }>({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await axios.get("/api/content");
      console.log(response.data.content);
      console.log(response.data.notes);

      return response.data;
    },
  });
};
