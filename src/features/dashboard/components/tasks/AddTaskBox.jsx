import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import { FormControl } from "@/components/UI/Forms/FormControl";
import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { BsFillSendFill } from "react-icons/bs";
import { useTasks } from "@/features/tasks/contexts/TasksProvider";

const StyledAddTaskBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 0;
  overflow: hidden;
`;

const AddTaskInputField = styled.div`
  border-radius: 0;
  width: 300px;
  min-height: 17px;
  max-height: 150px;
  overflow: hidden;
  color: #000;
  flex-grow: 1;
  padding: 8px 20px;
  font: ${theme.typography.body.lg.regular};
  @media (max-width: ${breakpoints.laptop}) {
    font: ${theme.typography.body.lg.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.body.md.regular};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font: ${theme.typography.body.sm.regular};
  }
`;

const SendButton = styled(PrimaryButton)`
  border-radius: 0;
  box-shadow: none;
  align-self: stretch;
`;

const AddTaskDateField = styled(FormControl)`
  border-radius: 0;
  border: none;
  border-left: 1px solid #cecece;
  width: auto;
  flex-grow: 0;
  min-width: 140px;
  @media (max-width: ${breakpoints.mobile}) {
    min-width: 110px;
  }
`;

export default function AddTaskBox() {
  const inputTaskTitleRef = useRef();
  const inputTaskDateRef = useRef();

  const { addTask } = useTasks();

  useEffect(() => {
    if (inputTaskDateRef.current) {
      inputTaskDateRef.current.valueAsDate = new Date();
    }
  }, [inputTaskDateRef.current]);

  async function onClickSendButton() {
    if (inputTaskTitleRef.current.textContent.length === 0){
      return;
    }
      await addTask({
        title: inputTaskTitleRef.current.textContent,
        dueDate: inputTaskDateRef.current.value,
      });
    inputTaskTitleRef.current.textContent = "";
  }
  return (
    <StyledAddTaskBox>
      <AddTaskInputField
        contentEditable={true}
        ref={inputTaskTitleRef}
        onChange={(e) => {
          console.log(e);
        }}
      ></AddTaskInputField>
      <AddTaskDateField type="date" ref={inputTaskDateRef} />
      <SendButton onClick={onClickSendButton}>
        <BsFillSendFill />
      </SendButton>
    </StyledAddTaskBox>
  );
}
