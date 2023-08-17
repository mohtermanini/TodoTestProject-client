import React from "react";
import InputField from "./InputField";
import { FormControl } from "./FormControl";

export default function TextField({
  name,
  label,
  showLabel = true,
  placeholder,
  required = true,
  register,
  showErrors,
  errors,
  validate,
  pattern,
  minLength,
  maxLength = 1000000,
  horizontal,
  disabled,
  className,
  onChange,
  containerClassName,
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
      <FormControl
        type="text"
        {...register(name, {
          required: {
            value: required,
            message: `${label} field is required.`,
          },
          pattern: {
            value: pattern,
            message: `Invalid ${label && label.toLowerCase()}.`,
          },
          minLength: {
            value: minLength,
            message: `Minimum number of characters is ${minLength}.`,
          },
          maxLength: {
            value: maxLength,
            message: `Maximum number of characters is ${maxLength}.`,
          },
          onChange,
          validate,
        })}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
    </InputField>
  );
}
