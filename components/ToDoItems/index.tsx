import { Button, Container } from "@mantine/core";
import { ToDo } from "types";

export interface ToDoItemsInterface {
  todos: ToDo[];
  onDelete?: (id: string) => void;
}

export function ToDoItems({ todos, onDelete }: ToDoItemsInterface) {
  if (!todos.length)
    return (
      <p className="text-center text-gray-500 my-4">
        No items found. Start by adding one!
      </p>
    );

  return (
    <Container className="p-4 bg-background rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-dark text-center mb-4">
        To-Do List
      </h2>
      <ul className="space-y-3">
        {todos.map((todo, index) => (
          <li
            key={`${todo.name}${index}`}
            className="flex justify-between items-center p-4 bg-gray-light rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-gray-dark font-medium">{todo.name}</span>
            <Button
              // className="bg-pink-500 text-white s-lg hover:bg-pink-600 transition"
              color="pink"
              onClick={() => onDelete?.(todo.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
