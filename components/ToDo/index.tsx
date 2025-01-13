import { useState, useEffect } from "react";
import { AddItem } from "../AddItem";
import { ToDoItems } from "../ToDoItems";
import { Container, TextInput } from "@mantine/core";

export function ToDo() {
  const [toDoItems, setToDoItems] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredToDoItem, setFilteredItems] = useState<string[]>([]);
  const isLocalAccessMethod =
    (process.env.NEXT_PUBLIC_DATA_ACCESS_METHOD || "") === "local";

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    if (isLocalAccessMethod) return;
    try {
      const response = await fetch("https://codebuddy.co/todos");
      const items = await response.json();
      setToDoItems(items);
      setFilteredItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  async function handleAddItem(item: string) {
    const toDoItem = toDoItems.find((i) => i === item);
    if (toDoItem) {
      return alert(`item ${item} already available`);
    }
    if (isLocalAccessMethod) {
      return setToDoItems((prev) => {
        const _items = [...prev, item];
        setFilteredItems(_items);
        return _items;
      });
    }
    try {
      await fetch("https://codebuddy.co/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: item,
        }),
      });
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  async function handleDeleteItem(item: string) {
    if (isLocalAccessMethod) {
      return setToDoItems((prev) => {
        const _items = prev.filter((_item) => _item !== item);
        setFilteredItems(_items);
        return _items;
      });
    }
    try {
      await fetch(`https://codebuddy.co/todos/${item}`, {
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
      return setFilteredItems(toDoItems);
    }
    setFilteredItems(
      toDoItems.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
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
      <ToDoItems items={filteredToDoItem} onDelete={handleDeleteItem} />
    </Container>
  );
}
