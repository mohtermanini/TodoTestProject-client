import React, { useState } from "react";
import InputField from "./InputField";
import { FormControl } from "./FormControl";
import { styled } from "styled-components";
import { theme } from "@/data/theme";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { breakpoints } from "@/data/breakpoints";

const PasswordInputField = styled.div`
display: flex;
  input {
    border-radius: 0.25rem 0 0 0.25rem;
  }
`;

const EyeButton = styled.button`
  background-color: ${theme.palette.grey[600]};
  border-radius: 0 0.25rem 0.25rem 0;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 5px 12px;
  }
  
`;

export default function PasswordField({
  name,
  label,
  showLabel = true,
  placeholder,
  required = true,
  register,
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
  const passwordProps = {
    label,
    name,
    showLabel,
    errors,
    horizontal,
    containerClassName,
  };
  const [showPassword, setShowPassword] = useState(false);

  function onClickEyeButton() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <InputField {...passwordProps}>
      <PasswordInputField>
        <FormControl
          type={showPassword ? "text" : "password"}
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
        <EyeButton type="button" onClick={onClickEyeButton}>
          {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
        </EyeButton>
      </PasswordInputField>
    </InputField>
  );
}
