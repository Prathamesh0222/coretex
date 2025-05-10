import {
  Book,
  Brain,
  File,
  FileText,
  GithubIcon,
  Music,
  Notebook,
  Search,
  Twitter,
  Youtube,
} from "lucide-react";

export const steps = [
  {
    title: "Capture Anything",
    steps:
      "Save YouTube videos, tweets, Spotify playlists, or write quick notes — all in one unified space.",
    color: "bg-gradient-to-br from-red-500/10 to-red-600/5",
    borderColor: "border-red-500/20",
  },
  {
    title: "Organize Effortlessly",
    steps: [
      "Add tags, group content, and attach notes to keep everything structured and easy to revisit.",
    ],
    color: "bg-gradient-to-br from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Find It Fast",
    steps: [
      "Use powerful search and filters to quickly access any saved item — your second brain, always ready.",
    ],
    color: "bg-gradient-to-br from-green-500/10 to-green-600/5",
    borderColor: "border-green-500/20",
  },
];

export const features = [
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

export const icons = [
  {
    icon: <File size={20} className="text-orange-500" />,
  },
  {
    icon: <Notebook size={20} className="text-yellow-500" />,
  },
  {
    icon: <Brain size={20} className="text-purple-500" />,
  },
  {
    icon: <GithubIcon size={20} className="dark:text-white text-black" />,
  },
  {
    icon: <Youtube size={20} className="text-red-500" />,
  },
  {
    icon: <Music size={20} className="text-green-500" />,
  },
];
