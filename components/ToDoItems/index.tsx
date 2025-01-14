import { Button, Container } from "@mantine/core";
import { ToDo } from "types";

export interface ToDoItemsInterface {
  todos: ToDo[];
  onDelete?: (id: string) => void;
}

export function ToDoItems({ todos, onDelete }: ToDoItemsInterface) {
  if (!todos.length)
    return (
      <p className="text-gray-500 text-center mt-4">No items to display</p>
    );

  return (
    <Container className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        To-Do List
      </h2>
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li
            key={`${todo.name}${index}`}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-gray-700 font-medium">{todo.name}</span>
            <Button color="pink" onClick={() => onDelete?.(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
