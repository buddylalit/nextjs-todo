export interface ToDo {
  id: string;
  name: string;
}

export interface ToDoSlice {
  todos: ToDo[];
  addToDo: (todo: ToDo) => void;
  deleteToDo: (id: string) => void;
  updateToDo: (todo: ToDo) => void;
}

export interface UserSlice {
  name: string;
  email: string;
  setUser: (name: string, email: string) => void;
  logout: () => void;
}

export interface SharedSlice {
  getAll: () => { todos: ToDo[]; user: { name: string; email: string } };
}
