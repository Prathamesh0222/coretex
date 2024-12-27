import { useCurrentEditor } from "@tiptap/react";

export const Menubar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div>
      <button>H1</button>
    </div>
  );
};
