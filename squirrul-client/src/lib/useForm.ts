import set from "lodash/set";
import { useState } from "react";

const useForm = (initialState: any, callback?: Function) => {
  const [values, setValues] = useState(initialState);

  const handleSubmit = (event?: Event) => {
    if (event) event.preventDefault();
    if (callback) callback(values);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues((values: any) => set({ ...values }, name, value));
  };

  const setFieldValue = (field: string, value: any) => {
    setValues((values: any) => set({ ...values }, field, value));
  };

  return {
    setFieldValue,
    handleChange,
    handleSubmit,
    values,
    setValues,
  };
};

export default useForm;
