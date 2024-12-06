import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "./Button";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  tags: Array<{ _id: string; title: string }>;
  onDelete: (contentId: string) => void;
}

const Card = ({ title, link, type, _id, onDelete, tags }: CardProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      await axios.delete(`${BACKEND_URL}/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          contentId: _id,
        },
      });
      onDelete(_id);
    } catch (error) {
      console.error("Error while deleting content", error);
    }
  };

  return (
    <div>
      <div className="p-4 bg-dark-400 rounded-lg max-w-72 shadow-xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <ShareIcon size={20} />
            <span className="text-white text-md">{title}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <a href={link} target="_blank">
              <ShareIcon size={20} />
            </a>
            <Button
              onClick={handleDelete}
              variant="primary"
              startIcon={<ShareIcon />}
            />
            <ShareIcon size={20} />
          </div>
        </div>
        {type === "youtube" && (
          <iframe
            className="w-full mt-2"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet w-full h-full">
            <p lang="en" dir="ltr">
              <a href={link}></a>
            </p>
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag._id}
                className="bg-dark-300 px-2 py-1 rounded text-sm text-white"
              >
                {tag.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
