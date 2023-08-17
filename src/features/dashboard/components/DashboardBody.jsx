"use client";
import { Container } from "@/styles/GlobalStyles";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { css, styled } from "styled-components";
import bgImage from "../../../assets/images/background.jpg";
import { BsFillTrashFill } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { MdSort } from "react-icons/md";
import { theme } from "@/data/theme";
import { breakpoints } from "@/data/breakpoints";
import { useTodoLists } from "@/features/todolists/contexts/TodoListsProvider";
import Swal from "sweetalert2";
import TodoListContainer from "./TodoListContainer";
import TasksContainer from "./tasks/TasksContainer";
import SearchTasksField from "./tasks/SearchTasksField";
import TodoListBox from "./TodoListBox";
import { useTasks } from "@/features/tasks/contexts/TasksProvider";

const StyledDashboardBody = styled.main`
  background-image: url(${bgImage.src});
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const DashboardBodyContainer = styled(Container)`
  display: flex;
  flex-grow: 1;
  @media (max-width: 1150px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DetailsContainer = styled.div`
  width: 100%;
  padding: 40px 50px;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 30px 30px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px 25px;
  }
`;

const Header = styled.div`
  background-color: ${theme.palette.primary[500]};
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: ${breakpoints.tablet}) {
    display: grid;
    grid-template-areas: "input preheader" "postheader postheader";
    grid-template-columns: 1fr auto;
    gap: 10px;
    background-color: transparent;
    border-radius: 0;
  }
`;

const HeaderTitle = styled(({ listExpanded, ...props }) => <div {...props} />)`
  flex-grow: 1;
  margin-left: 35px;
  font: ${theme.typography.title.xl.bold};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.title.lg.bold};
  }
  @media (max-width: ${breakpoints.tablet}) {
    position: relative;
    font: ${theme.typography.title.md.bold};
    grid-area: input;
    margin-left: 0;
    background-color: ${theme.palette.primary[500]};
    width: 100%;
    padding: 15px 25px;
    ${({ listExpanded }) => {
      if (listExpanded) {
        return css`
          border-radius: 10px 10px 0 0;
        `;
      } else {
        return css`
          border-radius: 10px;
        `;
      }
    }}
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.title.sm.bold};
  }
`;

const HeaderOptions = styled.div`
  display: flex;
  @media (max-width: ${breakpoints.tablet}) {
    gap: 10px;
  }
  > div {
    padding: 15px 25px;
    font-size: 24px;
    &:hover {
      background-color: ${theme.palette.primary[900]};
      cursor: pointer;
    }
    @media (max-width: ${breakpoints.laptop}) {
      font-size: 20px;
    }
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 18px;
      border-radius: 10px;
      padding: 12px 20px;
    }
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 16px;
      padding: 10px 16px;
    }
  }
`;

const PostHeaderOptions = styled(HeaderOptions)`
  @media (max-width: ${breakpoints.tablet}) {
    grid-area: postheader;
    justify-self: end;
  }
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 15px;
  }
`;

const PreHeaderOptions = styled(HeaderOptions)`
  @media (max-width: ${breakpoints.tablet}) {
    grid-area: preheader;
  }
`;

const DeleteOption = styled.div`
  background-color: ${theme.palette.primary[800]};
`;

const EditOption = styled.div`
  background-color: ${theme.palette.primary[700]};
`;

const SortOption = styled.div`
  background-color: ${theme.palette.primary[600]};
  position: relative;
  &:hover {
    div:last-child {
      display: block;
    }
  }
`;

const SortOptionsList = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
`;

const SortOptionsListItem = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  background-color: ${theme.palette.primary[600]};
  color: #fff;
  white-space: nowrap;
  &:not(:last-child) {
    border-bottom: 1px solid #cecece;
  }
  font: ${theme.typography.label.lg.regular};
  &:hover {
    background-color: ${theme.palette.primary[700]};
  }
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.label.md.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.label.sm.regular};
  }
`;

const MoreListsOption = styled.div`
  background-color: ${theme.palette.primary[800]};
  @media (min-width: 1151px) {
    display: none;
  }
`;

const MobileTodoLists = styled(({ listHeight, ...props }) => <ul {...props} />)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: ${({ listHeight }) => `${listHeight}px`};
  overflow: auto;
  transition: all 500ms ease-out;
  z-index: 99;
  display: none;
  @media (max-width: 1150px) {
    display: flex;
    flex-direction: column;
  }
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0 0 10px 0;
    background-color: #e7e7e7;
    border: 1px solid #cacaca;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0 0 10px 0;
    background-color: ${theme.palette.primary[900]};
  }
`;

export default function DashboardBody() {
  const { todolists, updateTodoList, deleteTodoList, selectedTodoListId } =
    useTodoLists();
  const {setSortColumn, setSortOrder} = useTasks();
  const mobileTodoListsRef = useRef();
  const [mobileTodoListsHeight, setMobileTodoListsHeight] = useState(0);

  async function onClickEditTodoList() {
    await Swal.fire({
      title: "Change list title",
      input: "text",
      inputValue: todolists.find(
        (todolist) => todolist.id === selectedTodoListId
      )?.title,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonColor: theme.palette.primary[500],
      cancelButtonColor: theme.palette.danger[500],
      confirmButtonText: "Modify",
      showLoaderOnConfirm: true,
      preConfirm: async (title) => {
        try {
          await updateTodoList({ todoListId: selectedTodoListId, title });
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error.response.data.message}`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  async function onClickDeleteTodoList() {
    const result = await Swal.fire({
      title:
        "Are you sure you want to delete this list and all its associated tasks?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: theme.palette.danger[500],
      showCancelButton: true,
      confirmButtonColor: theme.palette.primary[500],
      cancelButtonColor: theme.palette.danger[500],
      confirmButtonText: "Delete list",
    });
    if (result.isConfirmed) {
      await deleteTodoList({ todoListId: selectedTodoListId });
    }
  }

  useEffect(() => {
    setMobileTodoListsHeight(0);
  }, [selectedTodoListId]);

  function onClickMoreListsOptionButton() {
    const maximumHeight = 400;
    setMobileTodoListsHeight(() => {
      return mobileTodoListsHeight > 0
        ? 0
        : Math.min(maximumHeight, mobileTodoListsRef.current.scrollHeight);
    });
  }

  function onClickSortOption(sortColumn, sortOrder) {
    setSortColumn(sortColumn);
    setSortOrder(sortOrder);
  }

  return (
    <StyledDashboardBody>
      <DashboardBodyContainer>
        <TodoListContainer />
        {todolists && selectedTodoListId && (
          <DetailsContainer>
            <Header>
              <PreHeaderOptions>
                <MoreListsOption onClick={onClickMoreListsOptionButton}>
                  {mobileTodoListsHeight === 0 ? (
                    <BiSolidRightArrow />
                  ) : (
                    <BiSolidDownArrow />
                  )}
                </MoreListsOption>
              </PreHeaderOptions>
              <HeaderTitle listExpanded={mobileTodoListsHeight > 0}>
                {
                  todolists.find(
                    (todolist) => todolist.id === selectedTodoListId
                  )?.title
                }
                <MobileTodoLists listHeight={mobileTodoListsHeight}>
                  <div ref={mobileTodoListsRef}>
                    {todolists &&
                      todolists.map((list) => (
                        <TodoListBox key={list.id} {...list} />
                      ))}
                  </div>
                </MobileTodoLists>
              </HeaderTitle>
              <PostHeaderOptions>
                <SortOption>
                  <MdSort />
                  <SortOptionsList>
                    <SortOptionsListItem
                      onClick={() => {
                        onClickSortOption("due_date", "desc");
                      }}
                    >
                      Newest First
                    </SortOptionsListItem>
                    <SortOptionsListItem
                      onClick={() => {
                        onClickSortOption("due_date", "asc");
                      }}
                    >
                      Oldest First
                    </SortOptionsListItem>
                    <SortOptionsListItem
                      onClick={() => {
                        onClickSortOption("completed", "desc");
                      }}
                    >
                      Completed First
                    </SortOptionsListItem>
                    <SortOptionsListItem
                      onClick={() => {
                        onClickSortOption("completed", "asc");
                      }}
                    >
                      Not Completed First
                    </SortOptionsListItem>
                  </SortOptionsList>
                </SortOption>
                <EditOption onClick={onClickEditTodoList}>
                  <LuEdit />
                </EditOption>
                <DeleteOption onClick={onClickDeleteTodoList}>
                  <BsFillTrashFill />
                </DeleteOption>
              </PostHeaderOptions>
            </Header>
            <TasksContainer />
            <SearchTasksField />
          </DetailsContainer>
        )}
      </DashboardBodyContainer>
    </StyledDashboardBody>
  );
}
