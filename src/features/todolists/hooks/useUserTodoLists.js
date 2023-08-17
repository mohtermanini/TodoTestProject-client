import { useLoader } from "@/contexts/LoaderProvider";
import { appRoutes } from "@/data/appRoutes";
import { useAuth } from "@/features/auth/contexts/AuthProvider";
import {
  deleteData,
  getData,
  patchData,
  postData,
  putData,
} from "@/utils/requests";
import { useEffect, useState } from "react";

export function useUserTodoLists() {
  const { token } = useAuth();
  const [todolists, setTodoLists] = useState([]);
  const { incrementLoaderCount, decrementLoaderCount } = useLoader();

  useEffect(() => {
    if (token) {
      fetchTodoLists();
    }
  }, [token]);

  async function fetchTodoLists() {
    incrementLoaderCount();
    const data = await getData(appRoutes.todolists.index, token);
    setTodoLists(data.data.todolists);
    decrementLoaderCount();
  }

  async function postTodoList({ title }) {
    const formData = { title };
    try {
      incrementLoaderCount();
      const data = await postData(appRoutes.todolists.store, formData, token);
      fetchTodoLists();
      decrementLoaderCount();
      return data;
    } catch (error) {}
  }

  async function patchTodoList({ todoListId, title }) {
    const formData = { title };
    try {
      incrementLoaderCount();
      await patchData(appRoutes.todolists.update(todoListId), formData, token);
      fetchTodoLists();
      decrementLoaderCount();
    } catch (error) {
      throw error;
    }
  }

  async function deleteTodoList({ todoListId }) {
    try {
      incrementLoaderCount();
      await deleteData(appRoutes.todolists.destroy(todoListId), token);
      fetchTodoLists();
      decrementLoaderCount();
    } catch (error) {}
  }

  return {
    todolists,
    getTodoLists: fetchTodoLists,
    addTodoList: postTodoList,
    updateTodoList: patchTodoList,
    deleteTodoList,
  };
}
