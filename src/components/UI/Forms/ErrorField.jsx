import React from "react";
import { styled } from "styled-components";

const ErrorText = styled(({ error, ...props }) => <p {...props} />)`
  display: block;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 0.875em;
  color: #dc3545;
  opacity: ${({ error }) => (error ? 100 : 0)};
`;

export default function ErrorField({ error }) {
  return <ErrorText error={error}>{error?.message} &nbsp;</ErrorText>;
}
