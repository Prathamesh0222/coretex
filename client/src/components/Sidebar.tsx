import { useState } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { FilterIcon } from "../icons/FilterIcon";
import { ClipIcon } from "../icons/ClipIcon";
import { HomeIcon } from "../icons/HomeIcon";

enum ContentType {
  All = "all",
  Youtube = "youtube",
  Twitter = "twitter",
  Notes = "notes",
}

const Sidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState(ContentType.Notes);

  const handleItemClick = (filter: ContentType) => {
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
          Active={selectedItem === ContentType.All}
          onClick={() => handleItemClick(ContentType.All)}
          text="Home"
          icon={<HomeIcon />}
        />
        <SidebarItem
          Active={selectedItem === ContentType.Twitter}
          onClick={() => handleItemClick(ContentType.Twitter)}
          text="Twitter"
          icon={<TwitterIcon />}
        />
        <SidebarItem
          Active={selectedItem === ContentType.Youtube}
          onClick={() => handleItemClick(ContentType.Youtube)}
          text="Youtube"
          icon={<YoutubeIcon />}
        />
        <SidebarItem
          Active={selectedItem === ContentType.Notes}
          onClick={() => handleItemClick(ContentType.Notes)}
          text="Notes"
          icon={<ClipIcon />}
        />
      </div>
    </div>
  );
};

export default Sidebar;
