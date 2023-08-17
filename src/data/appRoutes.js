export const appRoutes = {
  baseUrl: "http://127.0.0.1:8000/api/v1/",
  auth: {
    store: "auth",
    destroy: "auth",
  },
  users: {
    store: "users",
    show: "users",
  },
  todolists: {
    index: "todolists",
    store: "todolists",
    update: (todolistId) => `todolists/${todolistId}`,
    destroy: (todolistId) => `todolists/${todolistId}`,
  },
  tasks: {
    index: (todolistId) => `todolists/${todolistId}/tasks`,
    show: (todolistId, taskId) => `todolists/${todolistId}/tasks/${taskId}`,
    store: (todolistId) => `todolists/${todolistId}/tasks`,
    update: (todolistId, taskId) => `todolists/${todolistId}/tasks/${taskId}`,
    destroy: (todolistId, taskId) => `todolists/${todolistId}/tasks/${taskId}`,
  },
};
