import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import React from "react";
import { SyncLoader } from "react-spinners";
import { styled } from "styled-components";

const StyledSpinLoader = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0 50px;
`;

const HashLoaderWrapper = styled.div`
  background-color: ${theme.palette.primary[700]};
  border: 2px solid #fff;
  max-width: 400px;
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.7);
  @media (max-width: ${breakpoints.laptop}) {
    max-width: 350px;
    height: 200px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 250px;
    height: 200px;
  }
`;

const Loader = styled(SyncLoader)`
  @media (max-width: ${breakpoints.laptop}) {
    span {
      width: 12px !important;
      height: 12px !important;
    }
  }
  @media (max-width: ${breakpoints.mobile}) {
    span {
      width: 10px !important;
      height: 10px !important;
    }
  }
`;

const Waiting = styled.p`
  font: ${theme.typography.body.xl.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.body.lg.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.body.md.regular};
  }
`;

export default function SpinLoader() {
  return (
    <StyledSpinLoader>
      <HashLoaderWrapper>
        <Loader color="#f5f5f5" />
        <Waiting>Loading...</Waiting>
      </HashLoaderWrapper>
    </StyledSpinLoader>
  );
}
