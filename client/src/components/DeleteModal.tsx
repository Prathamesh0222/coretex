import { Button } from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
      <div className="absolute w-full h-full backdrop-blur-sm opacity-70"></div>
      <div className="relative bg-dark-400 p-8 rounded-lg shadow-xl text-white z-10">
        <h1 className="text-xl">Are you sure you want to delete this?</h1>
        <p className="text-gray-700">
          Are you sure you want to delete this content? <br /> This action
          cannot be undone and you will lose all associated data.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={onClose}
            variant="secondary"
            text="Cancel"
            fontColor="black"
          />
          <Button onClick={onConfirm} variant="danger" text="Delete" />
        </div>
      </div>
    </div>
  );
};
