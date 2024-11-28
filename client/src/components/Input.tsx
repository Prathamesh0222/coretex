interface InputProps {
  onChange?: () => void;
  placeholder: string;
}

export const Input = ({ onChange, placeholder }: InputProps) => {
  return (
    <div className="flex justify-center items-center my-2">
      <input
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus: ring-1
         focus:ring-blue-200"
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
