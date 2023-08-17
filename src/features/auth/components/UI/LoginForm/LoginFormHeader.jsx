import React from "react";
import { Title, TitleContainer } from "../Form.elements";
import { FiLogIn } from "react-icons/fi";
import { styled } from "styled-components";
import { theme } from "@/data/theme";
import { breakpoints } from "@/data/breakpoints";
import Link from "next/link";
import { appPages } from "@/data/appPages";

const HaveAccount = styled(Link)`
  font: ${theme.typography.body.md.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.body.sm.regular};
  }
  &:hover {
    color: ${theme.palette.grey[200]};
  }
`;

export default function LoginFormHeader() {
  return (
    <TitleContainer>
      <Title>
        <span>Login</span>
        <FiLogIn />
      </Title>
      <HaveAccount href={appPages.signUp}>Don&apos;t have an account?</HaveAccount>
    </TitleContainer>
  );
}
