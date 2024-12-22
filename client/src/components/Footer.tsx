import { GithubIcon } from "../icons/GithubIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";

export const Footer = () => {
  return (
    <div className="container mx-auto flex justify-between p-4 items-center border-gray-500">
      <p className="text-gray-400 mb-4 md:mb-0">
        © 2024 Your Company. All rights reserved.
      </p>
      <div className="flex gap-2">
        <GithubIcon />
        <LinkedinIcon />
      </div>
    </div>
  );
};
