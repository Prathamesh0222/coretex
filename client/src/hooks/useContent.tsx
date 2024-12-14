import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

interface Content {
  _id: string;
  type: string;
  link: string;
  title: string;
  tags: Array<{ _id: string; title: string }>;
}

interface Note {
  _id: string;
  description: string;
}

export const useContent = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${BACKEND_URL}/content`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContent(response.data.content);
        setNotes(response.data.notes);
      } catch (err) {
        console.error("Error fetching content", err);
      }
    };
    fetchContent();

    const intervalId = setInterval(fetchContent, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return { content, notes, setNotes, setContent };
};
