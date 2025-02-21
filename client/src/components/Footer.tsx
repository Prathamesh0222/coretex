import { GithubIcon } from "../icons/GithubIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { GITHUB_URL, LINKEDIN_URL } from "../lib/ConstantVals";

export const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between px-4 items-center border-gray-500">
      <p className="text-gray-400 mb-4 md:mb-0">
        Designed & Developed by Prathamesh
      </p>
      <div className="flex gap-2">
        <GithubIcon onClick={() => (window.location.href = GITHUB_URL)} />
        <LinkedinIcon onClick={() => (window.location.href = LINKEDIN_URL)} />
      </div>
    </div>
  );
};
