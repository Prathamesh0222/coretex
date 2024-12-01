import { forwardRef, ForwardedRef, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

const CreateContentModal = forwardRef<HTMLDivElement, CreateContentModalProps>(
  ({ open, onClose }, ref: ForwardedRef<HTMLDivElement>) => {
    const [type, setType] = useState(ContentType.Youtube);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    if (!open) return null;

    const addContent = async () => {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;
      try {
        const response = await axios.post(`${BACKEND_URL}/content`, {
          title,
          link,
          type,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        toast.success("Content added successfully");
      } catch (error) {
        console.error("Error while adding content", error);
        toast.error("Error while adding content");
      }
    };

    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
        <div className="absolute w-full h-full bg-black opacity-70"></div>
        <div
          ref={ref}
          className="relative bg-white p-8 rounded-lg shadow-xl z-10"
        >
          <div className="flex justify-end">
            <div
              onClick={onClose}
              className="border border-gray-300 cursor-pointer"
            >
              <CrossIcon />
            </div>
          </div>
          <label>Title</label>
          <Input ref={titleRef} type="text" placeholder="Title" />
          <label>Link</label>
          <Input ref={linkRef} type="text" placeholder="Link" />
          <h2 className="text-center font-semibold mb-2">Select the type</h2>
          <div className="flex justify-center gap-2 mb-3">
            <Button
              text="Youtube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => {
                setType(ContentType.Youtube);
              }}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => {
                setType(ContentType.Twitter);
              }}
            />
          </div>
          <Button
            onClick={addContent}
            variant="primary"
            fullWidth={true}
            text="Submit"
          />
        </div>
      </div>
    );
  }
);

export default CreateContentModal;
