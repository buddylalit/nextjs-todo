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
    <Container className="p-0">
      <Grid className="p-0">
        <Grid.Col span={{ base: 12, xs: 10 }}>
          <TextInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Todo item"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 2 }}>
          <Button onClick={handleAddItem}>Add</Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
