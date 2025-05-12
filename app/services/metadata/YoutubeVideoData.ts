import axios from "axios";

export async function getYoutubeVideoData(url: string) {
  const videoUrl = new URL(url);
  let videoId: string | null = null;

  if (videoUrl.hostname === "youtu.be") {
    videoId = videoUrl.pathname.slice(1);
  } else if (videoUrl.hostname.includes("youtube.com")) {
    videoId = videoUrl.searchParams.get("v");
  }

  if (!videoId) {
    throw new Error("Could not extract video ID from URL");
  }

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
  );

  const videoData = response.data.items[0].snippet;
  return {
    title: videoData.title,
    description: videoData.description,
    tags: videoData.tags || [],
  };
}
