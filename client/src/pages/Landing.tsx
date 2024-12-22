import { Footer } from "../components/Footer";
import { LandingNavbar } from "../components/LandingNavbar";
import { Spotlight } from "../components/Spotlight";

const Landing = () => {
  return (
    <div className="flex flex-col bg-black min-h-screen text-white ">
      <LandingNavbar />
      <Spotlight className="left-80 top-20" fill="#0066ff" />
      <div className="flex-grow text-center">
        <h1 className="text-7xl font-bold mt-24">
          Welcome to <span className="text-blue-700">Brainly</span>
        </h1>
        <p className="text-xl text-gray-400 mt-2">
          A space to collect, revisit, and refresh your thoughts effortlessly.
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
