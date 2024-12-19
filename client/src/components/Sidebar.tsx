import { useState } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { FilterIcon } from "../icons/FilterIcon";

const Sidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState("All");

  const handleItemClick = (filter: string) => {
    setSelectedItem(filter);
    onFilterChange(filter);
  };

  return (
    <div className="h-screen bg-dark-400 backdrop-blur-sm border-r border-dark-300 hidden md:block md:w-72 fixed left-0 top-0">
      <h1 className="flex items-center gap-2 text-2xl text-white font-bold mt-8 mx-6">
        <FilterIcon /> Filter
      </h1>
      <div className="p-6">
        <SidebarItem
          Active={selectedItem === "All"}
          onClick={() => handleItemClick("All")}
          text="All"
          icon={<YoutubeIcon />}
        />
        <SidebarItem
          Active={selectedItem === "Twitter"}
          onClick={() => handleItemClick("Twitter")}
          text="Twitter"
          icon={<TwitterIcon />}
        />
        <SidebarItem
          Active={selectedItem === "Youtube"}
          onClick={() => handleItemClick("Youtube")}
          text="Youtube"
          icon={<YoutubeIcon />}
        />
      </div>
    </div>
  );
};

export default Sidebar;
