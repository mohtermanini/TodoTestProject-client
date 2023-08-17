import React, { useRef } from "react";
import { css, styled } from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { useTasks } from "@/features/tasks/contexts/TasksProvider";
import { theme } from "@/data/theme";
import { breakpoints } from "@/data/breakpoints";
import EditableDiv from "@/components/UI/EditableDiv/EditableDiv";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";

const StyledTaskDetailsContainer = styled.div`
  flex-grow: 1;
  background-color: ${theme.palette.primary[200]};
  padding: 20px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${theme.palette.secondary[200]};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
`;

const MarkCompletionButton = styled(({ completed, ...props }) => (
  <SecondaryButton {...props} />
))`
  padding: 10px 15px;
  font: ${theme.typography.label.lg.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.label.md.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.label.sm.regular};
  }
  ${({ completed }) => {
    if (completed) {
      return css`
        background-color: ${theme.palette.danger[500]};
        &:hover {
          background-color: ${theme.palette.danger[600]};
        }
      `;
    }
  }}
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${theme.typography.label.xl.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.label.lg.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.label.md.regular};
  }
`;

const DueDateContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TaskTitleRefContainer = styled.div`
  padding: 0 15px;
`;

const TaskTitle = styled(EditableDiv)`
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.title.sm.bold};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.title.sm.bold};
  }
  &:hover,
  &:focus {
    background-color: ${theme.palette.secondary[300]} !important;
  }
`;

const DescriptionContainer = styled.div`
  background-color: ${theme.palette.secondary[400]};
  padding: 25px 15px;
`;

const DescriptionTitle = styled.h3`
  margin-bottom: 10px;
`;

const DescriptionRefContainer = styled.div``;

const Description = styled(({ descriptionExists, ...props }) => (
  <EditableDiv {...props} />
))`
  padding: 10px 15px;

  font: ${theme.typography.body.lg.regular};
  &:hover,
  &:focus {
    background-color: ${theme.palette.secondary[200]};
  }
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.body.md.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.body.sm.regular};
  }
  ${({ descriptionExists }) => {
    if (!descriptionExists) {
      return css`
        background-color: ${theme.palette.secondary[200]} !important;
      `;
    }
  }};
`;

const DeleteTaskButton = styled(SecondaryButton)`
  align-self: flex-end;
  margin-right: 15px;
  margin-top: auto;
`;

export default function TaskDetailsContainer() {
  const { selectedTask, updateTask, deleteTask } = useTasks();
  const taskTitleRef = useRef();
  const taskDescriptionRef = useRef();

  function onBlurTaskTitle() {
    const newTitle = taskTitleRef.current.firstElementChild.textContent;
    if (newTitle.length === 0) {
      taskTitleRef.current.firstElementChild.textContent = selectedTask.title;
    } else if (selectedTask.title !== newTitle) {
      updateTask({
        id: selectedTask.id,
        title: newTitle,
      });
    }
  }

  async function onBlurTaskDescription() {
    const newDescription =
      taskDescriptionRef.current.firstElementChild.textContent;
    if (
      (selectedTask.description === null && newDescription) ||
      (selectedTask.description !== null &&
        selectedTask.description !== newDescription)
    ) {
     try {
       const res = await updateTask({
        id: selectedTask.id,
        description: newDescription,
      });
     }catch(error) {
       taskDescriptionRef.current.firstElementChild.textContent = selectedTask.description;
     }
    }
  }

  function onClickMarkCompletionButton() {
    updateTask({
      id: selectedTask.id,
      completed: !selectedTask.completed,
    });
  }

  async function onClickDeleteTaskButton() {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this task?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: theme.palette.danger[500],
      showCancelButton: true,
      confirmButtonColor: theme.palette.primary[500],
      cancelButtonColor: theme.palette.danger[500],
      confirmButtonText: "Delete task!",
    });
    if (result.isConfirmed) {
      await deleteTask({ id: selectedTask.id });
    }
  }

  if (!selectedTask) return null;
  return (
    <StyledTaskDetailsContainer>
      <Header>
        <MarkCompletionButton
          completed={selectedTask.completed}
          onClick={onClickMarkCompletionButton}
        >
          {selectedTask.completed ? "Mark as complete" : "Mark as incomplete"}
        </MarkCompletionButton>
        <DueDate>
          <FaCalendarAlt />
          <DueDateContent>
            {new Date(selectedTask.due_date).toLocaleDateString()}
          </DueDateContent>
        </DueDate>
      </Header>
      <TaskTitleRefContainer ref={taskTitleRef}>
        <TaskTitle onBlur={onBlurTaskTitle}>{selectedTask.title}</TaskTitle>
      </TaskTitleRefContainer>
      <DescriptionContainer>
        <DescriptionTitle>Description</DescriptionTitle>
        <DescriptionRefContainer ref={taskDescriptionRef}>
          <Description
            descriptionExists={selectedTask.description !== null}
            onBlur={onBlurTaskDescription}
            placeholder={"Enter description..."}
          >
            {selectedTask.description}
          </Description>
        </DescriptionRefContainer>
      </DescriptionContainer>
      <DeleteTaskButton onClick={onClickDeleteTaskButton}>
        <BsFillTrashFill />
      </DeleteTaskButton>
    </StyledTaskDetailsContainer>
  );
}
