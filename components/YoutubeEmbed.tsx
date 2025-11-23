export const YoutubeEmbed = ({ link }: { link: string }) => {
  if (!link) {
    return null;
  }

  return (
    <div className="w-full aspect-video mt-6">
      <iframe
        width="100%"
        height="100%"
        src={link.replace("watch", "embed").replace("?v=", "/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-xl"
      ></iframe>
    </div>
  );
};
