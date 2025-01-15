import { useState } from "react";
import { AddItem } from "../AddItem";
import { ToDoItems } from "../ToDoItems";
import { Container, TextInput } from "@mantine/core";
import { ToDo as ToDoType } from "types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function ToDo() {
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const {
    data: toDoItems = [],
    isLoading,
    isError,
  } = useQuery<ToDoType[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("https://codebuddy.co/todos");
      if (!response.ok) {
        throw new Error("Error fetching todos");
      }
      return response.json();
    },
  });

  const addToDoMutation = useMutation({
    mutationFn: async (item: string) => {
      const response = await fetch("https://codebuddy.co/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item }),
      });
      if (!response.ok) {
        throw new Error("Error adding todo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteToDoMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`https://codebuddy.co/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting todo");
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const filteredToDoItems = searchText
    ? toDoItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : toDoItems;

  function handleFilterItems(value: string) {
    setSearchText(value);
  }

  function handleAddItem(item: string) {
    if (toDoItems.some((i) => i.name === item)) {
      return alert(`Item "${item}" already exists.`);
    }
    addToDoMutation.mutate(item);
  }

  function handleDeleteItem(id: string) {
    deleteToDoMutation.mutate(id);
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong fetching todos.</p>;

  return (
    <Container className="p-4 bg-gray-50 rounded-lg shadow-md max-w-md mx-auto my-2">
      <TextInput
        className="my-2"
        value={searchText}
        onChange={(e) => handleFilterItems(e.target.value)}
        placeholder="Search"
      />
      <AddItem onAdd={handleAddItem} />
      <ToDoItems todos={filteredToDoItems} onDelete={handleDeleteItem} />
    </Container>
  );
}
