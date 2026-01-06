import axios from "axios";

export async function getTwitterData(url: string) {
  const tweetId = url.split("/status/")[1]?.split("?")[0];
  if (!tweetId) {
    throw new Error("Invalid Twitter URL");
  }
  const apiKey = process.env.TWITTER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          "user.fields": "username",
          expansions: "author_id",
        },
      }
    );
    const tweet = response.data.data;
    const user = response.data.includes.users[0];

    return {
      title: `Tweet by @${user.username}`,
      description: tweet.text,
      tags: ["Twitter", user.username, ...(tweet.text.match(/#\w+/g) || [])],
    };
  } catch (error) {
    console.error("Failed to fetch Twitter data", error);
    throw error;
  }
}
