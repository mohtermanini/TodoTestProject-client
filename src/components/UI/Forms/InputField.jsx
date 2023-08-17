import React from "react";
import ErrorField from "./ErrorField";
import FormLabel from "./FormLabel";
import { css, styled } from "styled-components";

const StyledInputField = styled(({ horizontal, ...props }) => (
  <div {...props} />
))`
  width: 100%;
  ${({ horizontal }) => {
    if (horizontal) {
      return css`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
      `;
    }
  }}
`;

export default function InputField({
  name,
  label,
  showLabel,
  showErrors = true,
  errors,
  horizontal,
  children,
  containerClassName,
}) {
  return (
    <StyledInputField className={containerClassName}>
      {showLabel && label && (
        <FormLabel name={name} horizontal={horizontal}>
          {label}
        </FormLabel>
      )}
      {children}
      {showErrors && <ErrorField error={errors[name]} />}
    </StyledInputField>
  );
}
