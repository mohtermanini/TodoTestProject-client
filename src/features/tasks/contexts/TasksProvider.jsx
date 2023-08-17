"use client";

import { useTodoLists } from "@/features/todolists/contexts/TodoListsProvider";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTasksModify } from "../hooks/useTasksModify";
import { useTasksPagination } from "../hooks/useTasksPagination";

const TasksContext = createContext();

export default function TasksProvider({ children }) {
  const { selectedTodoListId } = useTodoLists();
  const [tasks, setTasks] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const {
    page,
    fetchNextPage,
    fetchPrevPage,
    checkIfNextPageExist,
    checkIfPrevPageExist,
  } = useTasksPagination(totalPages);
  const [searchTerms, setSearchTerms] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const { getTasks, addTask, updateTask, deleteTask } = useTasksModify(
    selectedTodoListId,
    searchTerms,
    sortColumn,
    sortOrder,
    page,
    setTotalPages
  );
  const { refetchTodoLists } = useTodoLists();

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (selectedTodoListId) {
      refetchTasks();
    }
  }, [selectedTodoListId]);

  useEffect(() => {
    if (tasks && selectedTaskId) {
      setSelectedTask(() => findTaskById(selectedTaskId));
    }
    if (selectedTaskId === null && selectedTask !== null) {
      setSelectedTask(null);
    }
  }, [selectedTaskId, tasks]);

  useEffect(() => {
    refetchTasks();
  }, [searchTerms, sortColumn, sortOrder, page]);

  function findTaskById(taskId) {
    const keys = Object.keys(tasks);
    for (let i = 0; i < keys.length; i++) {
      const result = tasks[keys[i]].find((task) => task.id === taskId);
      if (result) {
        return result;
      }
    }
  }

  function refetchTasks() {
    getTasks().then((data) => setTasks(data));
  }

  async function _addTask(data) {
    try {
      await addTask(data);
      refetchTasks();
      refetchTodoLists();
    } catch (error) {}
  }

  async function _updateTask(data) {
    try {
      await updateTask(data);
      refetchTasks();
    } catch (error) {
      throw error;
    }
  }

  async function _deleteTask(data) {
    try {
      await deleteTask(data);
      if (data.id === selectedTaskId) {
        setSelectedTaskId(null);
      }
      refetchTasks();
      refetchTodoLists();
    } catch (error) {}
  }

  function checkIfTasksNotEmpty() {
    return tasks && Object.keys(tasks).length > 0;
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        selectedTaskId,
        setSelectedTaskId,
        selectedTask,
        addTask: _addTask,
        updateTask: _updateTask,
        deleteTask: _deleteTask,
        setSearchTerms,
        setSortColumn,
        setSortOrder,
        checkIfTasksNotEmpty,
        fetchNextPage,
        fetchPrevPage,
        checkIfNextPageExist,
        checkIfPrevPageExist,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
