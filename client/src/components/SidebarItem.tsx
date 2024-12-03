import { ReactElement } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
  Active: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon,
  text,
  Active,
  onClick,
}: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center gap-2 mt-2 cursor-pointer p-2 rounded-lg ${
        Active ? "bg-dark-300 text-white" : "text-gray-700 hover:bg-purple-200"
      }`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
};
