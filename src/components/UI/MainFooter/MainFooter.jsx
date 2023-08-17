"use client";

import { appData } from "@/data/appData";
import { appPages } from "@/data/appPages";
import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import { Container } from "@/styles/GlobalStyles";
import Link from "next/link";
import React from "react";
import { styled } from "styled-components";

const StyledMainFooter = styled.div`
  background-color: ${theme.palette.primary[700]};
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

const MainFooterContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr auto;
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

const Brief = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Title = styled.h2`
  font: ${theme.typography.headline.sm.bold};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.headline.sm.bold};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.headline.xs.bold};
  }
`;

const TitleDescription = styled.p`
  font: ${theme.typography.body.xl.regular};
  @media (max-width: ${breakpoints.desktop}) {
    font: ${theme.typography.body.lg.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.body.md.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.body.md.regular};
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  font: ${theme.typography.label.xl.regular};
  @media (max-width: ${breakpoints.desktop}) {
    font: ${theme.typography.label.lg.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.label.md.regular};
    gap: 8px;
    flex-direction: column;
    align-items: flex-start;
    margin-left: auto;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 0;
    margin-top: 18px;
    gap: 16px;
  }
`;

const Separator = styled.hr`
  height: 1px;
  width: 100%;
  background-color: ${theme.palette.white};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const Copyright = styled.p`
  font: ${theme.typography.label.md.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.label.sm.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  grid-column-start: span 2;
  margin-top: 18px;
  text-align: center;
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const MobileSeparator = styled(Separator)`
  max-width: 400px;
  display: block;
`;

const MobileCopyright = styled(Copyright)`
  display: block;
`;

export default function MainFooter() {
  return (
    <StyledMainFooter>
      <MainFooterContainer>
        <Brief>
          <Title>{appData.title}</Title>
          <TitleDescription>{appData.titleDescription}</TitleDescription>
        </Brief>
        <Navigation>
          <List>
            {/* <Link href={appPages.aboutUs}>About us</Link>
            <Link href={appPages.contactUs}>Contact us</Link> */}
            <a role="button">About us</a>
            <a role="button">Contact us</a>
          </List>
          <Separator />
          <Copyright>{appData.copyright}</Copyright>
        </Navigation>
        <MobileContainer>
          <MobileSeparator />
          <MobileCopyright>{appData.copyright}</MobileCopyright>
        </MobileContainer>
      </MainFooterContainer>
    </StyledMainFooter>
  );
}
