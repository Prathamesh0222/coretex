import { useState } from "react";
import { BrainlyIcon } from "../icons/BrainlyIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("Youtube");
  return (
    <div className="h-screen bg-white border-r hidden md:block md:w-72 fixed left-0 top-0">
      <div className="flex justify-center">
        <h1 className="flex items-center gap-2 text-3xl font-bold mt-8">
          {" "}
          <BrainlyIcon /> Brainly
        </h1>
      </div>
      <div className="p-8">
        <SidebarItem
          Active={selectedItem === "Youtube"}
          onClick={() => {
            setSelectedItem("Youtube");
          }}
          text="Youtube"
          icon={<YoutubeIcon />}
        />
        <SidebarItem
          Active={selectedItem === "Twitter"}
          onClick={() => {
            setSelectedItem("Twitter");
          }}
          text="Twitter"
          icon={<TwitterIcon />}
        />
      </div>
    </div>
  );
};

export default Sidebar;
