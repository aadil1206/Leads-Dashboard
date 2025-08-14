import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";

const FormField = ({
  name,
  label,
  type = "text",
  as = "input",
  options,
  className = "",
  ...props
}) => (
  <div className={`sm:col-span-1 col-span-2 ${className}`}>
    <label className="block text-sm text-[#020817]">{label}</label>
    {as === "select" ? (
      <Select
        options={options}
        menuPlacement="top"
        className="text-sm"
        onChange={(option) => props.setFieldValue(name, option)}
      />
    ) : (
      <Field
        name={name}
        type={type}
        as={as}
        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    )}
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs"
    />
  </div>
);

export default FormField;
