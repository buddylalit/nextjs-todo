import { Button, Container } from "@mantine/core";

export interface ToDoItemsInterface {
  items: string[];
  onDelete?: (item: string) => void;
}

export function ToDoItems({ items, onDelete }: ToDoItemsInterface) {
  if (!items.length) return <></>;
  return (
    <Container>
      {items?.map((item, index) => (
        <Container key={`${item}${index}`}>
          <div>{item}</div>
          <Button
            unstyled
            className="bg-red-400 px-2 py-1 rounded-md "
            onClick={() => onDelete?.(item)}
          >
            Delete
          </Button>
        </Container>
      ))}
    </Container>
  );
}
