import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant={"ghost"} onClick={() => handleThemeChange()}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
};
