import { useEffect, useState } from "react";
import { AddItem } from "../AddItem";
import { ToDoItems } from "../ToDoItems";
import { Container, TextInput } from "@mantine/core";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ToDo as ToDoType } from "types";
import { SortingState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export function ToDo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const searchText = searchParams.get("search") || "";
  const pageIndex = Number(searchParams.get("page")) || 0;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const sortBy = searchParams.get("sortBy") || "id";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const [pagination, setPagination] = useState({ pageIndex, pageSize });
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortBy, desc: sortOrder === "desc" },
  ]);

  useEffect(() => {
    try {
      const params = new URLSearchParams();
      params.set("search", searchText);
      params.set("page", String(pagination.pageIndex));
      params.set("pageSize", String(pagination.pageSize));
      params.set("sortBy", sorting[0]?.id || "id");
      params.set("sortOrder", sorting[0]?.desc ? "desc" : "asc");
      window.history.pushState({}, "", `?${params.toString()}`);
    } catch (e) {
      console.log(e);
    }
  }, [pagination, sorting, searchText, router]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos", pagination, sorting, searchText],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(pagination.pageIndex + 1),
        pageSize: String(pagination.pageSize),
        sortBy: sorting[0]?.id || "id",
        sortOrder: sorting[0]?.desc ? "desc" : "asc",
        search: searchText,
      });
      const response = await fetch(`https://codebuddy.co/todos?${params}`);
      if (!response.ok) {
        throw new Error("Error fetching todos");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
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

  const updateToDoMutation = useMutation({
    mutationFn: async (todo: ToDoType) => {
      const response = await fetch("https://codebuddy.co/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Error updating todo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleFilterItems = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  const handleAddItem = (item: string) => {
    if (data?.items.some((i: ToDoType) => i.name === item)) {
      alert(`Item "${item}" already exists.`);
      return;
    }
    addToDoMutation.mutate(item);
  };

  const handleDeleteItem = (id: string) => deleteToDoMutation.mutate(id);
  const handleUpdateToDo = (todo: ToDoType) => updateToDoMutation.mutate(todo);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong fetching todos.</p>;

  return (
    <Container className="p-4 bg-gray-50 rounded-lg shadow-md max-w-md mx-auto my-2">
      <TextInput
        className="my-2"
        value={searchText}
        onChange={(e) => handleFilterItems(e.target.value)}
        placeholder="Search todos"
      />
      <AddItem onAdd={handleAddItem} />
      <ToDoItems
        todos={data.items}
        totalItems={data.total}
        onDelete={handleDeleteItem}
        onEdit={handleUpdateToDo}
        onFetchData={(newPagination, newSorting) => {
          setPagination(newPagination);
          setSorting(newSorting);
          const params = new URLSearchParams();
          params.set("page", String(newPagination.pageIndex));
          params.set("pageSize", String(newPagination.pageSize));
          params.set("sortBy", newSorting[0]?.id || "id");
          params.set("sortOrder", newSorting[0]?.desc ? "desc" : "asc");
          window.history.pushState({}, "", `?${params.toString()}`);
        }}
      />
    </Container>
  );
}
