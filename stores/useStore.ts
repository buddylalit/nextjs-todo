import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { ToDoSlice, UserSlice, SharedSlice } from "../types";

const createToDoSlice: StateCreator<
  ToDoSlice & UserSlice & SharedSlice,
  [],
  [],
  ToDoSlice
> = (set) => ({
  todos: [],
  addToDo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteToDo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  updateToDo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)),
    })),
});

const createUserSlice: StateCreator<
  ToDoSlice & UserSlice & SharedSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  name: "",
  email: "",
  setUser: (name, email) => set(() => ({ name, email })),
  logout: () => set(() => ({ name: "", email: "" })),
});

const createSharedSlice: StateCreator<
  ToDoSlice & UserSlice & SharedSlice,
  [],
  [],
  SharedSlice
> = (_, get) => ({
  getAll: () => {
    const { todos } = get() as ToDoSlice;
    const { name, email } = get() as UserSlice;
    return { todos, user: { name, email } };
  },
});

export const useStoreState = create(
  persist<ToDoSlice & UserSlice & SharedSlice>(
    (...a) => ({
      ...createToDoSlice(...a),
      ...createUserSlice(...a),
      ...createSharedSlice(...a),
    }),
    {
      name: "todo-user-store",
    }
  )
);

export function useStore() {
  return {
    ...useStoreState((state) => state),
  };
}
