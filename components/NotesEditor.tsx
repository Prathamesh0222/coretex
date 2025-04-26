import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";

export const NotesEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      <Toolbar editor={editor} />
      <EditorContent
        className="border rounded-lg pt-12 overflow-y-auto h-[400px]"
        editor={editor}
      />
    </div>
  );
};
1;
