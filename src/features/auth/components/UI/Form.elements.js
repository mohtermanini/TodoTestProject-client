import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import { styled } from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h2`
  display: flex;
  gap: 8px;
  align-items: center;
  font: ${theme.typography.headline.md.bold};
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.headline.xs.bold};
  }
`;

export const SubmitButton = styled(SecondaryButton)`
  width: 100%;
`;
