import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import React from "react";
import { styled } from "styled-components";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { useTasks } from "@/features/tasks/contexts/TasksProvider";
import { theme } from "@/data/theme";
import { breakpoints } from "@/data/breakpoints";

const StyledTaskListPagination = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 15px;
  justify-content: flex-end;
`;

const PrevButton = styled(SecondaryButton)`
  &:disabled {
    background-color: ${theme.palette.grey[600]};
    &:hover {
      background-color: ${theme.palette.grey[600]};
    }
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
`;

const NextButton = styled(SecondaryButton)`
  &:disabled {
    background-color: ${theme.palette.grey[600]};
    &:hover {
      background-color: ${theme.palette.grey[600]};
    }
  }
`;

export default function TaskListPagination() {
  const {
    tasks,
    checkIfTasksNotEmpty,
    fetchPrevPage,
    fetchNextPage,
    checkIfNextPageExist,
    checkIfPrevPageExist,
  } = useTasks();

  if (!checkIfTasksNotEmpty()) return null;
  return (
    <StyledTaskListPagination>
      <PrevButton onClick={fetchPrevPage} disabled={!checkIfPrevPageExist()}>
        <BiSolidLeftArrow />
      </PrevButton>
      <NextButton onClick={fetchNextPage} disabled={!checkIfNextPageExist()}>
        <BiSolidRightArrow />
      </NextButton>
    </StyledTaskListPagination>
  );
}
