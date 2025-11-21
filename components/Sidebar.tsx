import {
  Folder,
  Layers,
  LogOut,
  Moon,
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import {
  SidebarComponents,
  SidebarFilterComponents,
  SidebarMobileComponents,
} from "@/lib/constants/SidebarComponents";
import { CreateSpaceDialog } from "./CreateSpaceDialog";
import axios from "axios";
import { Space } from "@/types/space-type";

interface SidebarProps {
  onFilterChange: (filter: string) => void;
}

export const Sidebar = ({ onFilterChange }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("dashboard");
  const [spaces, setSpaces] = useState<Space[]>([]);
  const { theme, setTheme } = useTheme();
  const session = useSession();

  const fetchSpaces = async () => {
    try {
      const response = await axios.get("/api/space");
      setSpaces(response.data);
    } catch (error) {
      console.error("Failed to fetch spaces", error);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchSpaces();
    }
  }, [session.status]);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <>
      <div
        className={`
         bg-[#f6f7f7]/40 dark:bg-[#141212]/95 backdrop-blur-md
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "hidden lg:block w-[280px] p-4"
            : "hidden lg:block w-[70px] p-3.5"
        }
        shadow-lg shadow-gray-100/50 dark:shadow-none
      `}
      >
        <span className="flex justify-between items-center mb-8">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <Layers
                size={35}
                className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
              />
              <h1 className="text-xl font-bold">Coretex</h1>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Layers
                size={35}
                className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
              />
            </div>
          )}
          {isSidebarOpen && (
            <div
              onClick={handleSidebar}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
            >
              <PanelRightOpen className="w-5 h-5" />
            </div>
          )}
          {!isSidebarOpen && (
            <div
              onClick={handleSidebar}
              className="absolute -right-3 top-13 p-1.5 bg-white dark:bg-[#141212] border border-gray-200 dark:border-gray-800 rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </div>
          )}
        </span>
        <div className="flex flex-col h-[calc(100%-80px)]">
          <div className="flex-grow space-y-4">
            {SidebarComponents.map((sidebar, index) => (
              <div
                key={index}
                onClick={() => handleFilterChange(sidebar.filter)}
                className={`
                flex items-center gap-3 p-2.5 rounded-xl cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  activeFilter === sidebar.filter
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
              >
                <div
                  className={`${
                    activeFilter === sidebar.filter
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {sidebar.icon}
                </div>
                {isSidebarOpen && (
                  <div
                    className={`text-sm font-medium ${
                      activeFilter === sidebar.filter
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {sidebar.title}
                  </div>
                )}
              </div>
            ))}
            <div className="border w-full my-6" />
            {SidebarFilterComponents.map((sidebar, index) => (
              <div
                key={index}
                onClick={() => handleFilterChange(sidebar.filter)}
                className={`
                flex items-center gap-3 p-2.5 rounded-xl cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  activeFilter === sidebar.filter
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
              >
                <div
                  className={`${
                    activeFilter === sidebar.filter
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {sidebar.icon}
                </div>
                {isSidebarOpen && (
                  <div
                    className={`text-sm font-medium ${
                      activeFilter === sidebar.filter
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {sidebar.title}
                  </div>
                )}
              </div>
            ))}

            <div className="border w-full my-6" />
            <div className="flex items-center justify-between px-2 mb-2">
              {isSidebarOpen && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Spaces
                </h3>
              )}
              <CreateSpaceDialog onSpaceCreated={fetchSpaces} />
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[200px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {spaces.map((space) => (
                <div
                  key={space.id}
                  onClick={() => handleFilterChange(`space:${space.id}`)}
                  className={`
                    flex items-center gap-3 p-2.5 rounded-xl cursor-pointer
                    transition-all duration-200 ease-in-out
                    ${
                      activeFilter === `space:${space.id}`
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <div
                    className={`${
                      activeFilter === `space:${space.id}`
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Folder size={20} />
                  </div>
                  {isSidebarOpen && (
                    <div
                      className={`text-sm font-medium truncate ${
                        activeFilter === `space:${space.id}`
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {space.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex items-center pt-3 border-t border-gray-200 dark:border-gray-800 ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <User className="w-10 h-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#141212]"></div>
                </div>
                <div>
                  <h1 className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">
                    {session.data?.user.username ||
                      session.data?.user.name?.split(" ")[0]}
                  </h1>
                  <h2 className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {session.data?.user.email.slice(0, 20)}
                  </h2>
                </div>
              </div>
            ) : null}
            <div className="mt-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 font-semibold">
                  <DropdownMenuItem className="p-2 focus:bg-gray-100 dark:focus:bg-gray-800 rounded-lg cursor-pointer">
                    <div
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="flex items-center gap-2"
                    >
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                      <span className="text-sm">Change Theme</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 focus:bg-gray-100 dark:focus:bg-gray-800 rounded-lg cursor-pointer">
                    <div
                      onClick={() => signOut()}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden block fixed bottom-0 p-3 bg-[#f6f7f7]/40 dark:bg-[#141212] w-full rounded-t-2xl z-20">
        <div className="flex items-center justify-between container mx-auto">
          {SidebarMobileComponents.map((sidebar, index) => (
            <div
              key={index}
              onClick={() => handleFilterChange(sidebar.filter)}
              className={`
                flex items-center gap-3 p-2.5 rounded-xl cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  activeFilter === sidebar.filter
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <div
                className={`${
                  activeFilter === sidebar.filter
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {sidebar.icon}
              </div>

              <div
                className={`hidden md:block text-sm font-medium ${
                  activeFilter === sidebar.filter
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {sidebar.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
