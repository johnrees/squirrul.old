import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Acorn, GET_ACORNS } from "../lib/api";

const AcornsList: React.FC = () => {
  const { data } = useQuery<{ acorns: Acorn[] }>(GET_ACORNS, {
    variables: {
      username: "john",
    },
  });

  return (
    <ol id="acorns">
      {data &&
        data.acorns.map((acorn) => (
          <li key={acorn.id}>
            {acorn.name && <h3>{acorn.name}</h3>}
            {acorn.body.slice(0, 50)}
          </li>
        ))}
    </ol>
  );
};

export default AcornsList;
