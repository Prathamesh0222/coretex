import { forwardRef, ForwardedRef, useRef, useState, useEffect } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "./Label";
import RichTextEditor from "./RichTextEditor";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Notes = "notes",
}

const CreateContentModal = forwardRef<HTMLDivElement, CreateContentModalProps>(
  ({ open, onClose }, ref: ForwardedRef<HTMLDivElement>) => {
    const [type, setType] = useState(ContentType.Youtube);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    const notesRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (open && titleRef.current) {
        titleRef.current.focus();
      }
    }, [open]);

    if (!open) return null;

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
      return;
    }

    const addContent = async () => {
      setIsLoading(true);
      const title = titleRef.current?.value || "";
      const link = linkRef.current?.value || "";
      const tagsString = tagsRef.current?.value || "";
      const tags = tagsString
        ? tagsString.split(",").map((tag) => tag.trim())
        : [];

      try {
        if (type === ContentType.Youtube || type === ContentType.Twitter) {
          if (!title || !link) {
            toast.error("Title and link are required");
            return;
          }

          await axios.post(
            `${BACKEND_URL}/content`,
            { title, link, type, tags },
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          toast.success("Content added successfully");
        }

        if (type === ContentType.Notes) {
          const description = notesRef.current?.value.trim() || "";
          if (!description) {
            toast.error("Notes are required");
            return;
          }

          await axios.post(
            `${BACKEND_URL}/content/notes`,
            { description },
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          toast.success("Notes added successfully");
        }

        if (titleRef.current) titleRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        if (tagsRef.current) tagsRef.current.value = "";
        if (notesRef.current) notesRef.current.value = "";
        onClose();
      } catch (error) {
        console.error("Error while adding content or notes", error);
        toast.error("Error while adding content or notes");
      } finally {
        setIsLoading(false);
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
          {type !== ContentType.Notes && (
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
              <Label text="Tags" />
              <Input ref={tagsRef} type="text" placeholder="tags" />
            </>
          )}
          {type === ContentType.Notes && (
            <>
              <Label text="Document" />

              <RichTextEditor
                editorContent={notesRef.current?.value || ""}
                onChange={(content) => {
                  if (notesRef.current) {
                    notesRef.current.value = content;
                  }
                }}
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
              fullWidth={true}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => {
                setType(ContentType.Twitter);
              }}
              fullWidth={true}
            />
            <Button
              text="Notes"
              variant={type === ContentType.Notes ? "primary" : "secondary"}
              onClick={() => {
                setType(ContentType.Notes);
              }}
              fontColor="black"
              fullWidth={true}
            />
          </div>
          <Button
            onClick={addContent}
            variant="primary"
            fullWidth={true}
            text={isLoading ? "Submitting..." : "Submit"}
            disabled={isLoading}
          />
        </div>
      </div>
    );
  }
);

export default CreateContentModal;
