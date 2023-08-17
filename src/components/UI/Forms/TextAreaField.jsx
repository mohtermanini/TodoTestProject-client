import React from "react";
import InputField from "./InputField";
import { TextAreaFormControl } from "./FormControl";

export default function TextAreaField({
  name,
  label,
  showLabel = true,
  rows = 6,
  placeholder,
  required = true,
  horizontal,
  register,
  showErrors,
  errors,
  className,
  disabled,
  containerClassName,
  onChange,
}) {
  const textProps = {
    label,
    name,
    showLabel,
    showErrors,
    errors,
    horizontal,
    containerClassName,
  };

  return (
    <InputField {...textProps}>
      <TextAreaFormControl
        rows={rows}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: required,
            message: `${label} field is required.`,
          },
          onChange,
        })}
        className={className}
        disabled={disabled}
      ></TextAreaFormControl>
    </InputField>
  );
}
