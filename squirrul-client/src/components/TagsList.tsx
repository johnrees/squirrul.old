import React from "react";

const TagsList: React.FC<{ tags: string[] }> = ({ tags }) => (
  <ol id="tags">
    {tags.map((tag) => (
      <li key={tag}>{tag}</li>
    ))}
  </ol>
);

export default TagsList;
