import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text?: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  fontWeight?: "sm" | "md" | "lg";
  disabled?: boolean;
  rounded?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const disabledClasses = "opacity-50 cursor-not-allowed";

const defaultStyles = "flex justify-center items-center gap-2";

const fontWeights = {
  sm: "font-thin",
  md: "font-semibold",
  lg: "font-bold",
};

export const Button = ({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  fontWeight,
  disabled = false,
  rounded,
}: ButtonProps) => {
  const isCircular = rounded && !text;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`
        ${variantClasses[variant]}
        ${defaultStyles}
        ${fullWidth ? "w-full" : ""}
        ${fontWeight ? fontWeights[fontWeight] : ""}
        ${disabled ? disabledClasses : ""}
        ${rounded ? "rounded-full" : "rounded-md"}
        ${isCircular ? "w-12 h-12" : "px-4 py-2"}
      `}
    >
      {startIcon}
      {!isCircular && text}
    </button>
  );
};
