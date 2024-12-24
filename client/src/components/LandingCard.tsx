import { ReactElement } from "react";

interface LandingCardProps {
  title: string;
  text: string;
  icon: ReactElement;
}

export const LandingCard = ({ title, text, icon }: LandingCardProps) => {
  return (
    <div className="relative mx-4 p-4 rounded-lg">
      {icon}
      <h3 className="text-lg font-bold my-2">{title}</h3>
      <p className="text-gray-300 text-sm mt-2">{text}</p>
    </div>
  );
};
