import { FileTextIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
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
      color: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/5 filter blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-accent/10 filter blur-2xl"></div>
      </div>
      <h1 className="text-5xl font-semibold text-center mt-7">How It Works</h1>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mx-18">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex justify-center items-center mb-12">
              <div className="p-3 text-center rounded-full border font-semibold w-12">
                {index}
              </div>
            </div>
            <div>
              <div className="p-6 border rounded-lg space-y-4">
                <div className="text-xl font-semibold text-center">
                  {step.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
