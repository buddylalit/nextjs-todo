import type { Meta, StoryObj } from "@storybook/react";
import { AddItem } from "./index";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof AddItem> = {
  title: "ToDo/AddItem",
  component: AddItem,
  tags: ["autodocs"],
  argTypes: {
    onAdd: { action: "itemAdded" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItems: Story = {
  args: {
    // onAdd: action("itemAdded"),
  },
};
