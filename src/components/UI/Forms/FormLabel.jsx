import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import React from "react";
import { styled } from "styled-components";

const StyledFormLabel = styled(({ horizontal, ...props }) => (
  <label {...props} />
))`
  margin-bottom: ${({ horizontal }) => (horizontal ? 0 : "15px")};
  color: #000;
  display: inline-block;
  font: ${theme.typography.label.lg.regular};
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.label.md.regular};
  }

`;

export default function FormLabel({
  name,
  horizontal = false,
  className,
  children,
}) {
  return (
    <StyledFormLabel
      htmlFor={name}
      horizontal={horizontal}
      className={className}
    >
      {children}
    </StyledFormLabel>
  );
}
