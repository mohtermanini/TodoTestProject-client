"use client";

import { appData } from "@/data/appData";
import { theme } from "@/data/theme";
import { Container } from "@/styles/GlobalStyles";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { css, styled } from "styled-components";
import SecondaryButton from "../Buttons/SecondaryButton";
import { breakpoints } from "@/data/breakpoints";
import { appPages } from "@/data/appPages";
import { useAuth } from "@/features/auth/contexts/AuthProvider";

const StyledMainNavbar = styled.nav`
  background-color: ${theme.palette.primary[700]};
`;

const MainNavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 30px 60px;
  @media (max-width: ${breakpoints.laptop}) {
    padding: 25px 40px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px 40px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px 30px;
  }
`;

const Title = styled.h1`
  font: ${theme.typography.headline.xl.bold};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.headline.lg.bold};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.headline.md.bold};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.headline.sm.bold};
  }
`;

const Options = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const GreetingContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 0;
  position: relative;
  font: ${theme.typography.label.xl.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.label.lg.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.label.md.regular};
  }
  &:hover {
    :last-child {
      opacity: 1;
      transform: translateY(0);
      z-index: 99;
    }
  }
`;

const Greeting = styled.p``;

const LogoutContainer = styled.div`
  position: absolute;
  z-index: -1;
  top: 105%;
  right: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 300ms ease-out;
`;

const HamburgerButton = styled(({ active, ...props }) => (
  <SecondaryButton {...props} />
))`
  padding-top: 22px;
  padding-bottom: 22px;
  transition: all 300ms linear;
  position: relative;
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 18px;
    padding-bottom: 18px;
  }
  ${({ active }) => {
    if (active) {
      return css`
        :first-child,
        :last-child {
          transform: translate(-50%, 0) !important;
        }
      `;
    }
  }}
`;

const SmallLine = styled.div`
  height: 1px;
  width: 16px;
  background-color: ${theme.palette.white};
  transition: all 300ms linear;
  &:first-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -8px);
    @media (max-width: ${breakpoints.mobile}) {
      transform: translate(-50%, -6px);
    }
  }
  &:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 8px);
    @media (max-width: ${breakpoints.mobile}) {
      transform: translate(-50%, 6px);
    }
  }
`;

const MobileOptionsList = styled(({ listHeight, ...props }) => (
  <ul {...props} />
))`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: ${({ listHeight }) => `${listHeight}px`};
  display: none;
  overflow: hidden;
  transition: all 500ms ease-out;
  z-index: 99;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
  }
`;

const MobileOption = styled.li`
  cursor: pointer;
  font: ${theme.typography.label.lg.regular};
  &:not(:last-child) {
    border-bottom: 1px solid #fff;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.label.md.regular};
  }
  a {
    display: inline-block;
    padding: 15px 20px;
    background-color: ${theme.palette.primary[800]};
    width: 100%;
    &:hover {
      background-color: ${theme.palette.primary[900]};
    }
  }
`;

export default function MainNavbar({ login, signup, greeting }) {
  const [hamburgerButtonActive, setHamburgerButtonActive] = useState(false);
  const [mobileOptionsListHeight, setMobileOptionsListHeight] = useState(0);
  const mobileOptionsListRef = useRef();
  const { user, logout } = useAuth();

  function onClickLogoutButton() {
    console.log(123);
    logout();
  }

  function onClickHamburgerButton() {
    setHamburgerButtonActive(() => !hamburgerButtonActive);
    setMobileOptionsListHeight(() => {
      return mobileOptionsListHeight > 0
        ? 0
        : mobileOptionsListRef.current.scrollHeight;
    });
  }

  return (
    <StyledMainNavbar>
      <MainNavbarContainer>
        <Title>
          {/* <Link href={appPages.homepage}>{appData.title}</Link> */}
          <a role="button">{appData.title}</a>
        </Title>
        <Options>
          {login && (
            <SecondaryButton>
              <Link href={appPages.login}>Login</Link>
            </SecondaryButton>
          )}
          {signup && (
            <SecondaryButton>
              <Link href={appPages.signUp}>Sign up</Link>
            </SecondaryButton>
          )}
          {greeting && (
            <>
              <GreetingContainer>
                <Greeting>Hey, {user.firstName}</Greeting>
                <FaCaretDown />
                <LogoutContainer>
                  <SecondaryButton onClick={onClickLogoutButton}>
                    Logout
                  </SecondaryButton>
                </LogoutContainer>
              </GreetingContainer>
            </>
          )}
        </Options>
        <HamburgerButton
          onClick={onClickHamburgerButton}
          active={hamburgerButtonActive}
        >
          <SmallLine />
          <SmallLine />
          <SmallLine />
        </HamburgerButton>
        <MobileOptionsList listHeight={mobileOptionsListHeight}>
          <div ref={mobileOptionsListRef}>
            {login && (
              <MobileOption>
                <Link href={appPages.login}>Login</Link>
              </MobileOption>
            )}
            {signup && (
              <MobileOption>
                <Link href={appPages.signUp}>Sign up</Link>
              </MobileOption>
            )}
            {greeting && (
              <MobileOption onClick={onClickLogoutButton}>
                <a role="button">Logout</a>
              </MobileOption>
            )}
          </div>
        </MobileOptionsList>
      </MainNavbarContainer>
    </StyledMainNavbar>
  );
}
