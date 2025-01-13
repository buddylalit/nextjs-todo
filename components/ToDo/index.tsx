import { useState, useEffect } from "react";
import { AddItem } from "../AddItem";
import { ToDoItems } from "../ToDoItems";
import { Container, TextInput } from "@mantine/core";
import { ToDo as ToDoType } from "types";

export function ToDo() {
  const [toDoItems, setToDoItems] = useState<ToDoType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredToDoItems, setFilteredItems] = useState<ToDoType[]>([]);
  const isApiMocking =
    (process.env.NEXT_PUBLIC_ENABLE_API_MOCKING || "") === "true";

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    if (!isApiMocking) return;
    try {
      const response = await fetch("https://codebuddy.co/todos");
      const data = await response.json();
      setToDoItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  async function handleAddItem(item: string) {
    if (toDoItems.some((i) => i.name === item)) {
      return alert(`Item "${item}" already exists.`);
    }

    if (!isApiMocking) {
      const newItem = { id: `${toDoItems.length + 1}`, name: item };
      setToDoItems((prev) => {
        const updatedItems = [...prev, newItem];
        setFilteredItems(updatedItems);
        return updatedItems;
      });
      return;
    }

    try {
      const res = await fetch("https://codebuddy.co/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item, id: "" }),
      });
      console.log("res", res);
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  async function handleDeleteItem(id: string) {
    if (!isApiMocking) {
      setToDoItems((prev) => {
        const updatedItems = prev.filter((item) => item.id !== id);
        setFilteredItems(updatedItems);
        return updatedItems;
      });
      return;
    }

    try {
      await fetch(`https://codebuddy.co/todos/${id}`, {
        method: "DELETE",
      });
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  function handleFilterItems(value: string) {
    setSearchText(value);
    if (!value) {
      setFilteredItems(toDoItems);
    } else {
      setFilteredItems(
        toDoItems.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }

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
