import React from "react";
import api, { Acorn as AcornType } from "../lib/api";
import useForm from "../lib/useForm";
import InlineEdit from "./InlineEdit";

const Acorn: React.FC<{ acorn: AcornType }> = ({ acorn }) => {
  const { values, handleChange, handleSubmit } = useForm(
    {
      name: acorn.name,
      body: acorn.body,
    },
    (data: AcornType) => {
      api.updateAcorn({ ...data, id: acorn.id });
    }
  );

  return (
    <div id="acorn">
      <InlineEdit
        value={values.name}
        InputTag="input"
        PreviewTag="h1"
        input={{
          name: "name",
          handleChange,
          handleSubmit,
        }}
      />
      <InlineEdit
        value={values.body}
        InputTag="textarea"
        PreviewTag="main"
        input={{
          name: "body",
          handleChange,
          handleSubmit,
        }}
      />
    </div>
  );
};

export default Acorn;
