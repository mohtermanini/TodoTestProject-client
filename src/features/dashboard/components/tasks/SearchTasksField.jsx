import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import TextField from "@/components/UI/Forms/TextField";
import { useTasks } from "@/features/tasks/contexts/TasksProvider";
import React from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { GrSearch } from "react-icons/gr";

const StyledSearchTasksField = styled.form`
  display: flex;
  margin-top: 80px;
`;

const TaskSearchInput = styled(TextField)`
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

const SearchButton = styled(PrimaryButton)`
  border-radius: 0 10px 10px 0;
  box-shadow: none;
  path {
    stroke: #fff;
  }
`;

export default function SearchTasksField() {
  const { setSearchTerms } = useTasks();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  async function onSubmitSearchForm(data) {
    setSearchTerms(data.search);
  }

  return (
    <StyledSearchTasksField onSubmit={handleSubmit(onSubmitSearchForm)}>
      <TaskSearchInput
        register={register}
        name={"search"}
        showErrors={false}
        required={false}
        placeholder={"Search for words inside title or description..."}
      />
      <SearchButton>
        <GrSearch />
      </SearchButton>
    </StyledSearchTasksField>
  );
}
