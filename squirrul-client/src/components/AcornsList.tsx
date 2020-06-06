import React from "react";
import { Acorn as AcornType } from "../lib/api";

const AcornsList: React.FC<{ acorns: AcornType[] }> = ({ acorns }) => (
  <ol id="acorns">
    {acorns.map((acorn) => (
      <li key={acorn.id}>
        {acorn.body.slice(0, 50)}
        {/* {acorn.acorns_tags.map(({ tag }) => (
            <span className="tag" key={tag.name}>
              {tag.name}
            </span>
          ))} */}
      </li>
    ))}
  </ol>
);

export default AcornsList;
