import { KeyboardEvent, useState } from "react";
import { Button, Grid, TextInput } from "@mantine/core";

export interface AddItemProps {
  onAdd?: (item: string) => void;
}

export function AddItem({ onAdd }: AddItemProps) {
  const [value, setValue] = useState("");

  function handleAddItem() {
    if (!value) return;
    onAdd?.(value);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      return handleAddItem();
    }
  }

  return (
    <Grid className="bg-background p-4 rounded-lg shadow-md">
      <Grid.Col span={{ base: 12, xs: 10 }}>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task"
          className="w-full text-gray-dark placeholder-gray-light border-gray rounded-lg"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 2 }} className="flex items-center">
        <Button
          onClick={handleAddItem}
          className="bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          Add
        </Button>
      </Grid.Col>
    </Grid>
  );
}
