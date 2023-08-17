"use client";
import { createGlobalStyle, styled } from "styled-components";
import "../assets/css/reset.css";
import { theme } from "@/data/theme";

export const GlobalStyles = createGlobalStyle`
    *,*::before,*::after {
      box-sizing: border-box;
    }
    
    body {
        min-height: 100vh;
        color: ${theme.palette.white};
        display: flex;
        flex-direction: column;
    }

    main {
        flex-grow: 1;
    }

    hr {
      margin: 0;
    }

    button {
      background-color: transparent;
      border: none;
      color: ${theme.palette.white};
      cursor: pointer;
      border-radius: 5px;
      padding: 10px 20px;
    }

     a {
      color: inherit;
      text-decoration: none;
     }
`;

export const Container = styled.div`
  max-width: 1500px;
  margin: auto;
  width: 100%;
`;
