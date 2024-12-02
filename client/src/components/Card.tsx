import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const Card = ({ title, link, type }: CardProps) => {
  return (
    <div>
      <div className="p-4 bg-white rounded-md max-w-72 border shadow-md">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <ShareIcon />
            <span className="text-black text-md">{title}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <a href={link} target="_blank">
              <ShareIcon />
            </a>
            <ShareIcon />
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
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              <br />
              <br />
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
