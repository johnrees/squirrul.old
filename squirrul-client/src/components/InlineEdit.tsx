import marked from "marked";
import React, { useState } from "react";

const InlineEdit: React.FC<{
  value: string;
  input: any;
  InputTag: any;
  PreviewTag: any;
}> = ({ value, input, InputTag, PreviewTag }) => {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <InputTag
        name={input.name}
        onChange={input.handleChange}
        onBlur={() => {
          setEditing(false);
          input.handleSubmit();
        }}
        value={value}
        autoFocus
      />
    );
  } else {
    return (
      <PreviewTag
        onClick={() => setEditing(true)}
        dangerouslySetInnerHTML={{ __html: marked(value) }}
      />
    );
  }
};

export default InlineEdit;
