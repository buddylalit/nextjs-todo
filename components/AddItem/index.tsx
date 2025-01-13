import { useState } from "react";
import { Button, Container, Grid, TextInput } from "@mantine/core";

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

  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 11 }}>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Todo item"
          className="w-full"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 1 }}>
        <Button
          className="bg-indigo-500 text-white hover:bg-indigo-600 w-full"
          onClick={handleAddItem}
        >
          Add
        </Button>
      </Grid.Col>
    </Grid>
  );
}
