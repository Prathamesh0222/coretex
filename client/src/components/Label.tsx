interface LabelProps {
  size?: "sm" | "md" | "lg";
  textColor?: "white" | "black";
  text: string;
}

const defaultSizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

const defaultTextColors = {
  white: "text-white",
  black: "text-black",
};

export const Label = ({
  size = "md",
  textColor = "white",
  text,
}: LabelProps) => {
  return (
    <label className={`${defaultSizes[size]} ${defaultTextColors[textColor]}`}>
      {text}
    </label>
  );
};
