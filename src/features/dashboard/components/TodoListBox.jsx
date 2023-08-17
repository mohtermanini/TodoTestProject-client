import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import { useTodoLists } from "@/features/todolists/contexts/TodoListsProvider";
import React from "react";
import { css, styled } from "styled-components";

const StyledTodoListBox = styled(({ selected, ...props }) => (
  <div {...props} />
))`
  background-color: ${theme.palette.primary[600]};
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  ${({ selected }) => {
    if (selected) {
      return css`
        outline: 1px solid #fff;
        background-color: ${theme.palette.primary[700]};
        `;
    } else {
      return css`
        &:hover {
          background-color: ${theme.palette.primary[700]};
          cursor: pointer;
        }
      `;
    }
  }}
`;

const Title = styled.div`
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  font: ${theme.typography.title.lg.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.title.sm.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.title.xs.regular};
  }
`;

const Badge = styled.div`
  background-color: ${theme.palette.secondary[600]};
  border-radius: 50%;
  padding: 4px 12px;
  font: ${theme.typography.label.lg.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.label.md.regular};
    padding: 2px 8px;
  }
`;

export default function TodoListBox({ id, title, remainingTasks }) {
  const { selectedTodoListId, setSelectedTodoListId } = useTodoLists();

  function onClickTodoListBox() {
    setSelectedTodoListId(() => id);
  }

  return (
    <StyledTodoListBox
      selected={selectedTodoListId === id}
      onClick={onClickTodoListBox}
    >
      <Title>{title}</Title>
      {remainingTasks > 0 && <Badge>{remainingTasks}</Badge>}
    </StyledTodoListBox>
  );
}
