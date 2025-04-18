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

interface Content {
  id: string;
  title: string;
  type: ContentType;
  link: string;
  ContentTags: ContentTag[];
}

export const useContent = () => {
  return useQuery<Content[]>({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await axios.get("/api/content");
      return response.data.content;
    },
  });
};
