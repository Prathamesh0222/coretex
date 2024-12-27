import { useNavigate } from "react-router-dom";
import { BrainlyIcon } from "../icons/BrainlyIcon";
import { Button } from "./Button";
import { motion } from "framer-motion";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
      }}
      className="container mx-auto p-4 flex items-center text-white justify-between"
    >
      <div className="flex gap-2 items-center">
        <BrainlyIcon />
        <h1 className="text-2xl font-bold">Brainly</h1>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            navigate("/signin");
          }}
          variant="primary"
          text="Login"
        />
        <Button
          onClick={() => {
            navigate("/signup");
          }}
          variant="border"
          text="Join Now"
        />
      </div>
    </motion.div>
  );
};
