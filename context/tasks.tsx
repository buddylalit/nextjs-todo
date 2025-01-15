import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TaskFormValues } from "types/task";

export interface TaskContextValues {
  tasks: TaskFormValues[];
  addTask: (task: TaskFormValues) => void;
  updateTask: (task: TaskFormValues) => void;
  deleteTask: (id: string) => void;
  setTasks: Dispatch<SetStateAction<TaskFormValues[]>>;
}

const TaskContext = createContext<TaskContextValues | null>(null);

export function TaskProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<TaskFormValues[]>([]);
  const isApiMocking =
    (process.env.NEXT_PUBLIC_ENABLE_API_MOCKING || "") === "true";

  const fetchTask = async () => {
    const response = await fetch("https://codebuddy.co/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (task: TaskFormValues) => {
    const _task = {
      ...task,
      id: Date.now().toLocaleString(),
    };
    if (isApiMocking) {
      await fetch("https://codebuddy.co/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(_task),
      });
      return fetchTask();
    }
    setTasks((prev) => [...prev, _task]);
  };

  const updateTask = async (updatedTask: TaskFormValues) => {
    if (isApiMocking) {
      await fetch(`https://codebuddy.co/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      return fetchTask();
    }
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = async (id: string) => {
    if (isApiMocking) {
      await fetch(`https://codebuddy.co/tasks/${id}`, {
        method: "DELETE",
      });
      return fetchTask();
    }
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, setTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
