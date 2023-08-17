import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import React from "react";
import { styled } from "styled-components";

const StyledSecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${theme.palette.secondary[500]};
  color: ${theme.palette.white};
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  padding: 10px 22px;
  font: ${theme.typography.label.xl.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.label.lg.regular};
    padding: 12px 16px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.label.md.regular};
    padding: 10px 16px;
  }
  &:hover {
    background-color: ${theme.palette.secondary[600]};
  }
`;

export default function SecondaryButton({ onClick, children, ...props }) {
  return (
    <StyledSecondaryButton {...props} onClick={onClick}>{children}</StyledSecondaryButton>
  );
}
