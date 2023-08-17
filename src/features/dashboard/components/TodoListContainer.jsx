import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import TextAreaField from "@/components/UI/Forms/TextAreaField";
import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import React from "react";
import { styled } from "styled-components";
import { GrAdd } from "react-icons/gr";
import TodoListBox from "./TodoListBox";
import { useTodoLists } from "@/features/todolists/contexts/TodoListsProvider";
import { useForm } from "react-hook-form";
import TextField from "@/components/UI/Forms/TextField";

const StyledTodoListsContainer = styled.div`
  width: 330px;
  max-height: 100%;
  overflow: auto;
  background-color: ${theme.palette.primary[300]};
  @media (max-width: 1150px) {
    margin-top: 50px;
    width: 100%;
    padding: 0 50px;
    background-color: transparent;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 30px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 25px;
  }
`;

const AddTodoListBox = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  background-color: #fff;
  height: 46px;
  @media (max-width: 1150px) {
    border-radius: 10px;
    overflow: hidden;
  }
`;

const TodoListTitleTextField= styled(TextField)`
  resize: none;
  border-radius: 0;
  flex-grow: 1;
  border: none;
  padding-right: 55px;
  font: ${theme.typography.title.lg.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.title.md.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.title.sm.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.title.xs.regular};
  }
`;

const TodoListTitleAddButton = styled(SecondaryButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  padding: 10px 12px;
  path {
    stroke: #fff;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px 10px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    padding: 6px 8px;
  }
`;

const TodoListsBoxes = styled.div`
  @media (max-width: 1150px) {
    display: none;
  }
`;

export default function TodoListContainer() {
  const { todolists, addTodoList, setSelectedTodoListId } = useTodoLists();

  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      todolistTitle: "",
    },
  });

  async function onSubmitAddListForm(data) {
    const formData = { title: data.todolistTitle };
    const newTodo = await addTodoList(formData);
    setSelectedTodoListId(newTodo.id);
    resetField('todolistTitle');
  }

  return (
    <StyledTodoListsContainer>
      <AddTodoListBox onSubmit={handleSubmit(onSubmitAddListForm)}>
        <TodoListTitleTextField
          name={"todolistTitle"}
          showLabel={false}
          register={register}
          placeholder={"Add list..."}
          showErrors={false}
        />
        <TodoListTitleAddButton>
          <GrAdd />
        </TodoListTitleAddButton>
      </AddTodoListBox>
      <TodoListsBoxes>
        {todolists &&
          todolists.map((list) => <TodoListBox key={list.id} {...list} />)}
      </TodoListsBoxes>
    </StyledTodoListsContainer>
  );
}
