import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "flex items-center gap-2 px-4 py-2 rounded-md font-thin";

export const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={variantClasses[variant] + " " + defaultStyles}
    >
      {startIcon}
      {text}
    </button>
  );
};
