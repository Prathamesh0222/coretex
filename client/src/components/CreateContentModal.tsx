import { forwardRef, ForwardedRef, useRef, useState, useEffect } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "./Label";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
}

const CreateContentModal = forwardRef<HTMLDivElement, CreateContentModalProps>(
  ({ open, onClose }, ref: ForwardedRef<HTMLDivElement>) => {
    const [type, setType] = useState(ContentType.Youtube);
    const navigate = useNavigate();
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const documentRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
      if (open && titleRef.current) {
        titleRef.current.focus();
      }
    }, [open]);

    if (!open) return null;

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
    }

    const addContent = async () => {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      if (!title || !link) {
        toast.error("Title and link are required");
        return;
      }

      try {
        const response = await axios.post(
          `${BACKEND_URL}/content`,
          {
            title,
            link,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        toast.success("Content added successfully");
        onClose();
      } catch (error) {
        console.error("Error while adding content", error);
        toast.error("Error while adding content");
      }
    };

    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
        <div className="absolute w-full h-full  backdrop-blur-sm"></div>
        <div
          ref={ref}
          className="relative bg-dark-400 p-8 rounded-lg shadow-xl z-10"
        >
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer text-white">
              <CrossIcon />
            </div>
          </div>
          {type !== ContentType.Document && (
            <>
              <Label text="Title" />
              <Input ref={titleRef} type="text" placeholder="Title" />
              <Label text="Link" />

              <Input
                ref={linkRef}
                type="text"
                placeholder={
                  type === ContentType.Youtube ? "Youtube URL" : "Twitter URL"
                }
              />
            </>
          )}
          {type === ContentType.Document && (
            <>
              <Label text="Document" />
              <textarea
                ref={documentRef}
                placeholder="Enter your document content"
                className="w-full h-56 px-2.5 py-2 rounded-lg border border-gray-300 bg-dark-300 text-white"
              />
            </>
          )}
          <h2 className="text-center font-semibold mb-2 text-white">
            Select the type
          </h2>
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
            <Button
              text="Document"
              variant={type === ContentType.Document ? "primary" : "secondary"}
              onClick={() => {
                setType(ContentType.Document);
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
