import { forwardRef, ForwardedRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = forwardRef<HTMLDivElement, CreateContentModalProps>(
  ({ open, onClose }, ref: ForwardedRef<HTMLDivElement>) => {
    if (!open) return null;

    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
        <div className="absolute w-full h-full bg-black opacity-70"></div>
        <div ref={ref} className="relative bg-white p-4 rounded z-10">
          <div className="flex justify-end">
            <div onClick={onClose}>
              <CrossIcon />
            </div>
          </div>
          <Input placeholder="Hi There" />
          <Input placeholder="Hi There" />
          <Button variant="primary" text="Submit" />
        </div>
      </div>
    );
  }
);

export default CreateContentModal;
