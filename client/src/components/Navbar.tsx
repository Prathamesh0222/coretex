import { BrainlyIcon } from "../icons/BrainlyIcon";

export const Navbar = () => {
  return (
    <div className="w-full backdrop-filter backdrop-blur-lg bg-opacity-45 fixed p-6 bg-dark-400 border-b border-dark-300 ">
      <h1 className="flex items-center gap-2 text-2xl text-white font-bold">
        <BrainlyIcon /> Brainly
      </h1>
    </div>
  );
};
