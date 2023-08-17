import React from "react";
import InputField from "./InputField";
import { FormControl } from "./FormControl";

export default function DateField({
  name,
  label,
  showLabel = true,
  placeholder,
  required = true,
  register,
  errors,
  showErrors,
  validate,
  horizontal,
  disabled,
  className,
  onChange,
  containerClassName,
}) {
  const dateProps = {
    label,
    name,
    showErrors,
    showLabel,
    errors,
    horizontal,
    containerClassName,
  };

  return (
    <InputField {...dateProps}>
      <FormControl
        type="date"
        {...register(name, {
          required: {
            value: required,
            message: `${label} field is required.`,
          },
          onChange,
          validate,
          valueAsDate: true,
        })}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
    </InputField>
  );
}
