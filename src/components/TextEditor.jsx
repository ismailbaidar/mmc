import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
export default function TextEditor({ placeholder, setDescription }) {
  const [content, setContent] = useState("");

  const config = useMemo(() => {
    {
      readonly: false, placeholder;
    }
  }, [placeholder]);
  return (
    <div>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          setDescription(newContent);
        }}
      />
    </div>
  );
}
