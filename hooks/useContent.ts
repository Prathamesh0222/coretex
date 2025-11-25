import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/CustomProvider";
import { toast } from "sonner";
import { Content, Notes } from "@/types/content-type";

export const useContent = () => {
  return useQuery<Array<Content | Notes>>({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await axios.get("/api/content");
      return response.data;
    },
  });
};

export const removeContent = async (contentId: string) => {
  try {
    const response = await axios.delete("/api/content", {
      data: { id: contentId },
    });

    if (response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Content deleted successfully");
    } else {
      toast.error("Failed to delete content");
    }
  } catch (error) {
    console.error("Error while deleting content", error);
    toast.error("Error while deleting content");
  }
};
