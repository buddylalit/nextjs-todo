import { Button, Container } from "@mantine/core";

export interface ToDoItemsInterface {
  items: string[];
  onDelete?: (item: string) => void;
}

export function ToDoItems({ items, onDelete }: ToDoItemsInterface) {
  if (!items.length)
    return (
      <p className="text-gray-500 text-center mt-4">No items to display</p>
    );

  return (
    <Container className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        To-Do List
      </h2>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={`${item}${index}`}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-gray-700 font-medium">{item}</span>
            <Button
              unstyled
              className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => onDelete?.(item)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
