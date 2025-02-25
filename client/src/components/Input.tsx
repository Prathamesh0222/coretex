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
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
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
