import axios from "axios";

async function getSpotifyUserToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.data.access_token;
}

export async function getSpotifyData(url: string) {
  const id = url.split("/").pop()?.split("?")[0];
  const type = url.includes("/track/")
    ? "track"
    : url.includes("/album/")
    ? "album"
    : "playlist";

  if (!id) throw new Error("Invalid Spotify URL");

  const token = await getSpotifyUserToken();
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/${type}s/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      title: response.data.name,
      description:
        type === "track"
          ? `By ${response.data.artists[0].name}`
          : `Playlist by ${response.data.owner?.display_name || "Unknown"}`,
      tags: [
        response.data.type,
        response.data.artists?.[0]?.name || "Various Artists",
        ...(response.data.genres || []),
      ],
    };
  } catch (error) {
    console.error("Failed while fetching metadata", error);
    throw error;
  }
}
