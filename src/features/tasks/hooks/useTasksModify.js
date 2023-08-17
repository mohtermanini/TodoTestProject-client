import { useLoader } from "@/contexts/LoaderProvider";
import { appRoutes } from "@/data/appRoutes";
import { useAuth } from "@/features/auth/contexts/AuthProvider";
import { deleteData, getData, patchData, postData } from "@/utils/requests";
import { toast } from "react-toastify";
import { tasksMessages } from "../data/tasksMessages";

export function useTasksModify(
  todoListId,
  searchTerms,
  sortColumn,
  sortOrder,
  page,
  setTotalPages
) {
  const { token } = useAuth();
  const { incrementLoaderCount, decrementLoaderCount } = useLoader();

  async function fetchTasks() {
    try {
      incrementLoaderCount();
      let queryString = "";
      if (searchTerms) {
        queryString += `search=${searchTerms}`;
      }
      if (sortColumn) {
        queryString += (queryString ? "&" : "") + `sort_col=${sortColumn}`;
      }
      if (sortOrder) {
        queryString += (queryString ? "&" : "") + `sort_order=${sortOrder}`;
      }
      if (page) {
        queryString += (queryString ? "&" : "") + `page=${page}`;
      }
      let url = appRoutes.tasks.index(todoListId);
      if (queryString) {
        url += `?${queryString}`;
      }
      const data = await getData(url, token);
      decrementLoaderCount();
      setTotalPages(data.data.totalPages);
      return data.data.tasks;
    } catch (error) {
      decrementLoaderCount();
    }
  }

  async function postTask({ title, dueDate }) {
    const formData = { title, due_date: dueDate };
    try {
      incrementLoaderCount();
      const data = await postData(
        appRoutes.tasks.store(todoListId),
        formData,
        token
      );
      decrementLoaderCount();
      toast.success(tasksMessages.taskCreated);
      return data;
    } catch (error) {
      decrementLoaderCount();
    }
  }

  async function patchTask({ id, title, dueDate, description, completed }) {
    const formData = { title, due_date: dueDate, description, completed };
    try {
      incrementLoaderCount();
      const data = await patchData(
        appRoutes.tasks.update(todoListId, id),
        formData,
        token
      );
      decrementLoaderCount();
      toast.success(tasksMessages.taskUpdated);
      return data;
    } catch (error) {
      decrementLoaderCount();
      throw error;
    }
  }

  async function deleteTask({ id }) {
    try {
      incrementLoaderCount();
      await deleteData(appRoutes.tasks.destroy(todoListId, id), token);
      toast.success(tasksMessages.taskDeleted);
      decrementLoaderCount();
    } catch (error) {
      decrementLoaderCount();
    }
  }

  return {
    getTasks: fetchTasks,
    addTask: postTask,
    updateTask: patchTask,
    deleteTask,
  };
}
