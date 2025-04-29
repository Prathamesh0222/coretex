import {
  Brain,
  File,
  Github,
  Layers,
  Music,
  Notebook,
  Youtube,
} from "lucide-react";

export const LandingConstants = () => {
  const icons = [
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
      icon: <Github size={20} className="text-white" />,
    },
    {
      icon: <Youtube size={20} className="text-red-500" />,
    },
    {
      icon: <Music size={20} className="text-green-500" />,
    },
    {
      icon: <Layers size={20} className="text-blue-500" />,
    },
  ];
  return (
    <div className="flex flex-col items-center container mx-auto gap-6 mt-16 mb-24">
      <div className="flex gap-4 animate-float-slow">
        {icons
          .slice()
          .reverse()
          .map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        <div className="gap-4 hidden md:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
        <div className="gap-4 hidden lg:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 animate-float">
        {icons.map((icon, index) => (
          <div
            className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
            key={index}
          >
            {icon.icon}
          </div>
        ))}
        <div className="gap-4 hidden md:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
        <div className="gap-4 hidden lg:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 animate-float-slow">
        {icons
          .slice()
          .reverse()
          .map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        <div className="gap-4 hidden md:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
        <div className="gap-4 hidden lg:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 animate-float">
        {icons.map((icon, index) => (
          <div
            className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
            key={index}
          >
            {icon.icon}
          </div>
        ))}
        <div className="gap-4 hidden md:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
        <div className="gap-4 hidden lg:flex">
          {icons.map((icon, index) => (
            <div
              className="p-3 border border-white/10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/20"
              key={index}
            >
              {icon.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
