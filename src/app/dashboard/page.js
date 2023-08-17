import MainFooter from "@/components/UI/MainFooter/MainFooter";
import MainNavbar from "@/components/UI/MainNavbar/MainNavbar";
import { appData } from "@/data/appData";
import RequireAuth from "@/features/auth/components/RequireAuth";
import DashboardBody from "@/features/dashboard/components/DashboardBody";
import TasksProvider from "@/features/tasks/contexts/TasksProvider";
import TodoListsProvider from "@/features/todolists/contexts/TodoListsProvider";
import React from "react";

export const metadata = {
  title: `Dashboard | ${appData.title}`,
  description: `${appData.titleDescription}`,
};

export default function Dashboard() {
  return (
    <RequireAuth>
      <MainNavbar greeting />
      <TodoListsProvider>
        <TasksProvider>
        <DashboardBody />
        </TasksProvider>
      </TodoListsProvider>
      <MainFooter />
    </RequireAuth>
  );
}
