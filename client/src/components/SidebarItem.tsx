import { ReactElement } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
}

export const SidebarItem = ({ icon, text }: SidebarItemProps) => {
  return (
    <div className="flex items-center gap-2 mt-2 hover:bg-purple-200 cursor-pointer p-2 rounded-lg">
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
};
