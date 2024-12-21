import { Footer } from "../components/Footer";
import { LandingNavbar } from "../components/LandingNavbar";

const Landing = () => {
  return (
    <div className="flex flex-col bg-dark-500 min-h-screen text-white">
      <LandingNavbar />
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
