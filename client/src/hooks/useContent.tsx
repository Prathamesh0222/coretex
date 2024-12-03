import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export const useContent = () => {
  const [content, setContent] = useState([]);

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
      } catch (err) {
        console.error("Error fetching content", err);
      }
    };
    fetchContent();

    const intervalId = setInterval(fetchContent, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return content;
};
