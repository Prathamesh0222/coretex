import { ChangeEventHandler, forwardRef } from "react";

interface InputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type: "text" | "password";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, placeholder, type, ...props }, ref) => {
    return (
      <div className="flex justify-center items-center my-2">
        <input
          className="w-full px-2.5 py-2 rounded-lg  bg-dark-300"
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
