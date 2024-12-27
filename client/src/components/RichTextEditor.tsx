import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";

export const RichTextEditor = () => {
  const extensions = [StarterKit];

  const content = "<p>Hello World!</p>";

  return (
    <div>
      <EditorProvider
        slotBefore={<Menubar />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </div>
  );
};
