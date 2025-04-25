import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  CodeSquare,
  Quote,
  Minus,
  Undo,
  Redo,
} from "lucide-react";

export const Toolbar = ({ editor }: any) => {
  return (
    <div className="tiptap-toolbar absolute z-20 bg-background border rounded-t-lg w-full">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Bold size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Italic size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Strikethrough size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Code size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Heading1 size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Heading2 size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Heading3 size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <List size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <ListOrdered size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "is-active border p-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            : "border p-2 rounded-md"
        }
      >
        <Quote size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="border p-2 rounded-md"
      >
        <Minus size={15} />
      </button>
    </div>
  );
};
