import { Layers } from "lucide-react";

export const CoretexLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Layers
        size={45}
        className="p-2.5 border rounded-xl bg-blue-500 text-white shadow-inner shadow-blue-300"
      />
      <h1 className="text-xl font-semibold">Coretex</h1>
    </div>
  );
};
