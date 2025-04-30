import { Music, Twitter, Youtube, Book, Search, FileText } from "lucide-react";

const features = [
  {
    icon: <Youtube className="w-6 h-6 text-red-600" />,
    title: "YouTube Integration",
    description:
      "Save YouTube videos by pasting the link. Coretex automatically fetches and displays the video thumbnail for easy reference.",
  },
  {
    icon: <Twitter className="w-6 h-6 text-blue-500" />,
    title: "Twitter Integration",
    description:
      "Save tweets by pasting the link. Brainly embeds the tweet so you can view it directly within the app.",
  },
  {
    icon: <Music className="w-6 h-6 text-green-600" />,
    title: "Spotify Integration",
    description:
      "Save Spotify playlists by pasting the link. Coretex automatically fetches and displays the playlist cover art and tracklist.",
  },
  {
    icon: <Book className="w-6 h-6 text-purple-600" />,
    title: "Rich Text Notes",
    description:
      "Create and format notes using a rich text editor. Supports bold, italic, headings, bullet points, and more.",
  },
  {
    icon: <FileText className="w-6 h-6 text-orange-500" />,
    title: "Content Summaries",
    description:
      "Add summaries to your saved content for quick reference. Summaries help you understand and organize your content better.",
  },
  {
    icon: <Search className="w-6 h-6 text-pink-500" />,
    title: "Search Functionality",
    description:
      "Quickly find saved content using a powerful search bar. Search by title, tags, type, or summary.",
  },
];

export const LandingFeatures = () => {
  return (
    <div className="container mx-auto md:mt-24 lg:mt-48 xl:mt-96 2xl:mt-64">
      <span className="flex justify-center items-center gap-4">
        <div className="p-3 md:p-4 border-2 rounded-2xl -rotate-12 bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20 hover:border-red-500/40 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
          <Youtube className="w-8 h-8 text-red-600" />
        </div>
        <div className="p-3 md:p-4 border-2 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:border-blue-500/40 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
          <Twitter className="w-8 h-8 text-blue-500" />
        </div>
        <div className="p-3 md:p-4 border-2 rounded-2xl rotate-12 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 hover:border-green-500/40 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
          <Music className="w-8 h-8 text-green-600" />
        </div>
      </span>
      <h1 className="text-4xl md:text-5xl font-semibold text-center mt-7">
        Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h2 className="text-2xl font-semibold tracking-tight mb-3">
                {feature.title}
              </h2>

              <p className="text-muted-foreground/90 leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};
