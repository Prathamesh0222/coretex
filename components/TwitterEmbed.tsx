import { TwitterTweetEmbed } from "react-twitter-embed";

export const TwitterEmbed = ({ link }: { link: string }) => {
  const tweetId = link.split("/").pop();
  return (
    <div
      style={{
        overflow: "auto",
        borderRadius: "7.2%",
      }}
    >
      <TwitterTweetEmbed tweetId={tweetId!} options={{ theme: "dark" }} />
    </div>
  );
};
