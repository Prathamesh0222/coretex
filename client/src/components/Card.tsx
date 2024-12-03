import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const Card = ({ title, link, type }: CardProps) => {
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
      </div>
    </div>
  );
};

export default Card;
