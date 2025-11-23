import { Tweet } from "react-tweet";
import { Suspense } from "react";
import { TweetSkeleton } from "react-tweet";

export const TwitterEmbed = ({ link }: { link: string }) => {
  const tweetIdMatch = link.match(/\/status\/(\d+)/);
  const tweetId = tweetIdMatch
    ? tweetIdMatch[1]
    : link.split("/").pop()?.split("?")[0];

  if (!tweetId) {
    return (
      <div className="text-sm text-muted-foreground">Invalid Twitter link</div>
    );
  }

  return (
    <div className="mx-2">
      <Suspense fallback={<TweetSkeleton />}>
        <Tweet id={tweetId} />
      </Suspense>
    </div>
  );
};
