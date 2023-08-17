import { useTasks } from "@/features/tasks/contexts/TasksProvider";
import React from "react";
import { css, styled } from "styled-components";

const StyledTask = styled.div`
  display: flex;
  gap: 6px;
`;

const InputCheckbox = styled.input`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-top: 0.25em;
  vertical-align: top;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.25);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-radius: 5px;
  &:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }
`;

const Title = styled(({ id, completed, ...props }) => <p {...props} />)`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "")};
  padding: 8px 12px;
  width: 100%;
  border-radius: 10px;
  overflow:hidden;
  text-overflow: ellipsis;
  ${({ selected }) => {
    if (selected) {
      return css`
        background-color: rgba(255, 255, 255, 0.3);
      `;
    } else {
      return css`
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
      `;
    }
  }}
`;

export default function TaskBox({ id, title, completed }) {
  const { selectedTask, setSelectedTaskId, updateTask } = useTasks();

  async function onChangeTaskCompletion() {
    await updateTask({ id, completed: completed ^ 1 });
  }

  function onClickTaskTitle() {
    if (!selectedTask || selectedTask.id !== id) {
      setSelectedTaskId(id);
    }
  }

  return (
    <StyledTask>
      <InputCheckbox
        type="checkbox"
        defaultChecked={completed}
        onChange={onChangeTaskCompletion}
      />
      <Title
        selected={selectedTask?.id === id}
        completed={completed}
        onClick={onClickTaskTitle}
      >
        {title}
      </Title>
    </StyledTask>
  );
}
