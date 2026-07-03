"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, LinkIcon, ImageIcon, Undo, Redo,
} from "lucide-react";

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "" } }),
      Image,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose-cadtri min-h-[400px] px-4 py-4 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const btnCls = (active: boolean) =>
    `flex items-center justify-center rounded-sm p-2 transition-colors ${
      active ? "bg-secondary text-white" : "text-muted hover:bg-border hover:text-foreground"
    }`;

  return (
    <div className="border border-border bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface p-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnCls(editor.isActive("bold"))} aria-label="Bold">
          <Bold size={15} strokeWidth={2} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnCls(editor.isActive("italic"))} aria-label="Italic">
          <Italic size={15} strokeWidth={2} />
        </button>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnCls(editor.isActive("heading", { level: 2 }))} aria-label="Heading 2">
          <Heading2 size={15} strokeWidth={2} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnCls(editor.isActive("heading", { level: 3 }))} aria-label="Heading 3">
          <Heading3 size={15} strokeWidth={2} />
        </button>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnCls(editor.isActive("bulletList"))} aria-label="Bullet list">
          <List size={15} strokeWidth={2} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnCls(editor.isActive("orderedList"))} aria-label="Numbered list">
          <ListOrdered size={15} strokeWidth={2} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnCls(editor.isActive("blockquote"))} aria-label="Quote">
          <Quote size={15} strokeWidth={2} />
        </button>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={btnCls(editor.isActive("link"))}
          aria-label="Insert link"
        >
          <LinkIcon size={15} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={btnCls(false)}
          aria-label="Insert image"
        >
          <ImageIcon size={15} strokeWidth={2} />
        </button>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btnCls(false)} aria-label="Undo">
          <Undo size={15} strokeWidth={2} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btnCls(false)} aria-label="Redo">
          <Redo size={15} strokeWidth={2} />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
