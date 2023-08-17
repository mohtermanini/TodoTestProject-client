"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserTodoLists } from "../hooks/useUserTodoLists";

const TodoListsContext = createContext();

export default function TodoListsProvider({ children }) {
  const [selectedTodoListId, setSelectedTodoListId] = useState(null);
  const [selectedTodoList, setSelectedTodoList] = useState(null);
  const {
    todolists,
    getTodoLists,
    addTodoList,
    updateTodoList,
    deleteTodoList,
  } = useUserTodoLists();

  useEffect(() => {
    if (
      todolists &&
      todolists.length > 0 &&
      (!selectedTodoListId ||
        !todolists.find((list) => list.id === selectedTodoListId))
    ) {
      setSelectedTodoListId(todolists[0].id);
    }
  }, [todolists]);

  useEffect(() => {
    if (selectedTodoListId === null) {
      setSelectedTodoList(null);
    } else {
      setSelectedTodoList(() =>
        todolists.find((list) => list.id === selectedTodoListId)
      );
    }
  }, [selectedTodoListId]);

  function refetchTodoLists() {
    getTodoLists();
  }

  async function _deleteTodoList(data) {
    await deleteTodoList(data);
    if (data.todoListId === selectedTodoListId) setSelectedTodoListId(null);
  }

  return (
    <TodoListsContext.Provider
      value={{
        selectedTodoListId,
        setSelectedTodoListId,
        selectedTodoList,
        todolists,
        refetchTodoLists,
        addTodoList,
        updateTodoList,
        deleteTodoList: _deleteTodoList,
      }}
    >
      {children}
    </TodoListsContext.Provider>
  );
}

export function useTodoLists() {
  return useContext(TodoListsContext);
}
