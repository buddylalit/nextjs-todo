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

  const addTask = (task: TaskFormValues) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now().toLocaleString(),
      },
    ]);
  };

  const updateTask = (updatedTask: TaskFormValues) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
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
