import React, { Fragment } from "react";
import TaskBox from "./TaskBox";
import { styled } from "styled-components";
import AddTaskBox from "./AddTaskBox";
import { theme } from "@/data/theme";
import { breakpoints } from "@/data/breakpoints";
import { useTodoLists } from "@/features/todolists/contexts/TodoListsProvider";
import { useTasks } from "@/features/tasks/contexts/TasksProvider";
import TaskDetailsContainer from "./TaskDetailsContainer";
import TaskListPagination from "./TaskListPagination";

const StyledTasksContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 50px;
  > * {
    width: 50%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    > * {
      width: 100%;
    }
  }
`;

const TasksListContainer = styled.div`
  background-color: ${theme.palette.primary[300]};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
`;

const TasksListWrapper = styled.div`
  background-color: ${theme.palette.primary[300]};
  border-radius: 10px;
  overflow: hidden;
  padding: 25px 30px;
`;
const NoTasksText = styled.p`
  color: ${theme.palette.grey[400]};
  text-align: center;
  font: ${theme.typography.title.lg.regular};
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.title.md.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.title.sm.regular};
  }
`;

const TaskDueDate = styled.h3`
  margin: 12px 0 6px;
  font: ${theme.typography.title.lg.regular};
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.title.md.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.title.sm.regular};
  }
`;

const TasksDueDateSeparator = styled.hr`
  height: 1px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 16px;
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function TasksContainer() {
  const { selectedTodoListId } = useTodoLists();
  const { tasks } = useTasks();

  console.log(selectedTodoListId)
  if (!selectedTodoListId) return null;
  return (
    <StyledTasksContainer>
      <TasksListContainer>
        <TasksListWrapper>
          {tasks && (
            <>
              {Object.keys(tasks).length > 0 ? (
                Object.keys(tasks).map((tasksDueDate) => (
                  <Fragment key={tasksDueDate}>
                    <TaskDueDate>{tasksDueDate}</TaskDueDate>
                    <TasksDueDateSeparator />
                    <TasksList>
                      {tasks[tasksDueDate].map((task) => (
                        <TaskBox
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          description={task.description}
                          dueDate={task.due_date}
                          completed={task.completed}
                          todoListId={selectedTodoListId}
                        />
                      ))}
                    </TasksList>
                  </Fragment>
                ))
              ) : (
                <NoTasksText>No tasks found!</NoTasksText>
              )}
            </>
          )}
        </TasksListWrapper>
        <div>
          <TaskListPagination />
          <AddTaskBox />
        </div>
      </TasksListContainer>
      <TaskDetailsContainer />
    </StyledTasksContainer>
  );
}
