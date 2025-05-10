import { icons } from "@/app/utils/mapData";

export const LandingConstants = () => {
  return (
    <div className="flex flex-col items-center container mx-auto gap-6  my-32 opacity-60">
      <div className="flex gap-4 animate-float">
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
