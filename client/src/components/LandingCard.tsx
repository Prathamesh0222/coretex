import { ReactElement } from "react";

interface LandingCardProps {
  title: string;
  text: string;
  icon: ReactElement;
}

export const LandingCard = ({ title, text, icon }: LandingCardProps) => {
  return (
    <div className="relative p-4 mx-auto border border-blue-500 border-opacity-10 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs">
      {icon}
      <h3 className="text-lg font-bold my-2">{title}</h3>
      <p className="text-gray-300 text-sm mt-2">{text}</p>
    </div>
  );
};
