import React from "react";
import InputField from "./InputField";
import { FormControl } from "./FormControl";

export default function EmailField({
  name,
  label,
  showLabel = true,
  placeholder,
  required = true,
  register,
  errors,
  validate,
  horizontal,
  className,
  onChange,
  containerClassName,
}) {
  const emailProps = {
    label,
    name,
    showLabel,
    errors,
    horizontal,
    containerClassName,
  };

  return (
    <InputField {...emailProps}>
      <FormControl
        {...register(name, {
          required: {
            value: required,
            message: `${label} field is required.`,
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address.",
          },
          onChange,
          validate,
        })}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
    </InputField>
  );
}
