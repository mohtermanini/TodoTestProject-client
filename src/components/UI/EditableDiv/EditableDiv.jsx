import { theme } from "@/data/theme";
import React from "react";
import { styled } from "styled-components";

const StyledEditableDiv = styled.div`
  padding: 10px 15px;
  border-radius: 10px;
  &[contenteditable="true"]:empty:before {
    content: attr(placeholder);
    pointer-events: none;
    display: block;
    color: ${theme.palette.grey[200]};
  }
  &:hover,
  &:focus {
    background-color: ${theme.palette.primary[100]};
  }
`;

export default function EditableDiv({ onBlur, ...props }) {
  function onKeyDown(e) {
    if (e.key === "Enter") {
      onBlur();
    }
  }

  return (
    <StyledEditableDiv
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      {...props}
      contentEditable
    />
  );
}
