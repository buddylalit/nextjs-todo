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
    <Grid>
      <Grid.Col span={{ base: 12, xs: 11 }}>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Todo item"
          className="w-full"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 1 }}>
        <Button onClick={handleAddItem} color="teal">
          Add
        </Button>
      </Grid.Col>
    </Grid>
  );
}
