import { useEffect, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TrashIcon } from "../icons/TrashIcon";
import { YoutubeIcon2 } from "../icons/YoutubeIcon2";
import { TwitterIcon2 } from "../icons/TwitterIcon2";
import { DeleteModal } from "./DeleteModal";

enum ContentType {
  All = "all",
  Youtube = "youtube",
  Twitter = "twitter",
  Notes = "notes",
}

interface CardProps {
  _id: string;
  title?: string;
  link?: string;
  type: ContentType;
  tags?: Array<{ _id: string; title: string }>;
  notes?: string;
  onDelete: (contentId: string, type: ContentType) => void;
}

const Card = ({ title, link, type, _id, onDelete, tags, notes }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleDeleteClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (type === ContentType.Twitter) {
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
      setIsOpen(false);
      onDelete(_id, type);
    } catch (error) {
      console.error("Error while deleting content", error);
    }
  };

  return (
    <div>
      <div className="p-4 bg-dark-400 rounded-lg shadow-xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            {type === ContentType.Youtube && <YoutubeIcon2 size={23} />}
            {type === ContentType.Twitter && <TwitterIcon2 size={20} />}
            <span className="text-gray-300 text-sm font-bold">{title}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <a href={link} target="_blank">
              <ShareIcon size={18} />
            </a>
            <div className="cursor-pointer" onClick={handleDeleteClick}>
              <TrashIcon size={18} />
            </div>
          </div>
        </div>
        {type === ContentType.Youtube && (
          <iframe
            width={"100%"}
            height={"200"}
            className="w-full mt-2"
            src={link?.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === ContentType.Twitter && (
          <blockquote className="twitter-tweet w-full h-full">
            <p lang="en" dir="ltr">
              <a href={link}></a>
            </p>
            <a href={link?.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {type === ContentType.Notes && (
          <div className="mt-2 text-gray-300 text-sm">{notes}</div>
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
      <DeleteModal
        isOpen={isOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Card;
