export const SpotifyEmbed = ({ link }: { link: string }) => {
  const getEmbedUrl = (link: string) => {
    const url = new URL(link);
    const pathParts = url.pathname.split("/");
    const type = pathParts[1];
    const id = pathParts[2];
    return `https://open.spotify.com/embed/${type}/${id}`;
  };
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src={getEmbedUrl(link)}
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};
