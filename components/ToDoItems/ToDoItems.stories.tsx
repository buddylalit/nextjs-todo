import type { Meta, StoryObj } from "@storybook/react";
import { ToDoItems, ToDoItemsProps } from "./index";
import { action } from "@storybook/addon-actions";

const mockTodos = [
  { id: "1", name: "Learn React" },
  { id: "2", name: "Build To-Do App" },
  { id: "3", name: "Write Documentation" },
  { id: "4", name: "Test Components" },
  { id: "5", name: "Publish Storybook" },
  { id: "6", name: "Test in Production" },
];

const meta: Meta<typeof ToDoItems> = {
  title: "ToDo/ToDoItems",
  component: ToDoItems,
  tags: ["autodocs"],
  argTypes: {
    todos: { control: { type: "object" } },
    onDelete: { action: "onDelete" },
    onEdit: { action: "onEdit" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todos: mockTodos,
    onDelete: action("onDelete"),
    onEdit: action("onEdit"),
  } as ToDoItemsProps,
};
