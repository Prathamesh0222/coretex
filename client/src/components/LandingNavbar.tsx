import { BrainlyIcon } from "../icons/BrainlyIcon";
import { Button } from "./Button";

export const LandingNavbar = () => {
  return (
    <div className="container mx-auto p-4 flex items-center text-white justify-between">
      <div className="flex gap-2 items-center">
        <BrainlyIcon />
        <h1 className="text-2xl font-bold">Brainly</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" text="Login" />
        <Button variant="border" text="Join Now" />
      </div>
    </div>
  );
};
