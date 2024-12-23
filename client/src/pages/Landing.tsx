import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { LandingCard } from "../components/LandingCard";
import { LandingNavbar } from "../components/LandingNavbar";
import { Spotlight } from "../components/Spotlight";
import { CloudIcon } from "../icons/CloudIcon";
import { NotesIcon } from "../icons/NotesIcon";
import { TagIcon } from "../icons/TagIcon";

const Landing = () => {
  return (
    <div className="flex flex-col bg-black min-h-screen text-white">
      <LandingNavbar />
      <div className="h-[35rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.5] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Spotlight className="left-80 top-20" fill="#0066ff" />
        <div className="flex-grow text-center">
          <span className="rounded-xl border border-blue-500 border-opacity-25 p-2 bg-dark-300 text-sm font-sans text-white">
            <span className="text-blue-500">#1 </span>
            Note taking platform
          </span>
          <h1 className="text-6xl font-semibold mt-4">
            Welcome to <span className="text-blue-700">Brainly</span>
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            Your second brain for all your content—save YouTube, Twitter, and{" "}
            <br />
            notes all in one place. Share with others, keep control of your
            thoughts.
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <Button text="Get Started" variant="primary" />
            <Button text="Features" variant="border" />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mx-8">
          <h3 className="text-lg text-blue-500">Features</h3>
          <h1 className="text-4xl font-bold">Why Choose Brainly?</h1>
        </div>
        <div className="flex justify-center">
          <LandingCard
            icon={<NotesIcon />}
            title="Easy Note-Taking"
            text="Create, edit, and organize text notes with a rich text editor."
          />
          <LandingCard
            icon={<TagIcon />}
            title="Tagging & Filtering"
            text="Add custom tags to notes and links, and filter content by tags for quick navigation."
          />
          <LandingCard
            icon={<CloudIcon />}
            title="Revision History"
            text="Track changes to notes and revisit old versions if needed."
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
