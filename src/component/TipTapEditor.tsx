"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TipTapEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false, 
    onUpdate: ({ editor }) => {
     const updatedContent = editor.getText(); // Just plain text
// Get the HTML content from the editor
      onChange(updatedContent); // Update the description state
    },
  });

  return (
    <div className="bg-white rounded-lg border p-4">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
