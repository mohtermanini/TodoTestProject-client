"use client";
import { theme } from "@/data/theme";
import React from "react";
import { styled } from "styled-components";
import { breakpoints } from "@/data/breakpoints";
import SignupFormHeader from "./SignupForm/SignupFormHeader";
import SignupFormBody from "./SignupForm/SignupFormBody";
import LoginFormBody from "./LoginForm/LoginFormBody";
import LoginFormHeader from "./LoginForm/LoginFormHeader";
import { Container } from "@/styles/GlobalStyles";

const StyledAuthForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 100px;
`;

const FormContainer = styled(Container)`
  width: 80%;
  max-width: 1000px;
  display: flex;
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const HeaderContainer = styled.div`
  background-color: ${theme.palette.primary[600]};
  padding: 85px 35px;
  border-radius: 10px 0 0 10px;
  min-width: 300px;
  @media (max-width: ${breakpoints.laptop}) {
    min-width: 275px;
    padding: 55px 30px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    min-width: 0;
    border-radius: 10px 10px 0 0;
    padding: 30px;
  }
`;

const BodyContainer = styled.div`
  border: 1px solid ${theme.palette.primary[600]};
  padding: 70px 90px;
  border-radius: 0 10px 10px 0;
  flex-grow: 1;
  @media (max-width: ${breakpoints.desktop}) {
    padding: 70px 70px;
  }
  @media (max-width: ${breakpoints.laptop}) {
    padding: 40px 60px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 0 0 10px 10px;
    padding: 30px;
  }
`;

export default function AuthForm({ signup, login }) {
  return (
    <StyledAuthForm>
      <FormContainer>
        <HeaderContainer>
          {signup && <SignupFormHeader />}
          {login && <LoginFormHeader />}
        </HeaderContainer>
        <BodyContainer>
          {signup && <SignupFormBody />}
          {login && <LoginFormBody />}
        </BodyContainer>
      </FormContainer>
    </StyledAuthForm>
  );
}
