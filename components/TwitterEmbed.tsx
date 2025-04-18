export const TwitterEmbed = ({ link }: { link: string }) => {
  return (
    <>
      <blockquote className="twitter-tweet" data-theme="dark">
        <p lang="en" dir="ltr">
          <a href={link} />
        </p>
        <a href={link.replace("x.com", "twitter.com")}></a>
      </blockquote>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </>
  );
};
