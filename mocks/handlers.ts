import { http, HttpResponse } from "msw";
import { ToDo } from "types";

let todos: ToDo[] = [];

export const handlers = [
  http.get("https://codebuddy.co/todos", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "5", 10);
    const sortBy = url.searchParams.get("sortBy") || "id";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const search = url.searchParams.get("search")?.toLowerCase() || "";
    let filteredTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(search)
    );

    filteredTodos.sort((a, b) => {
      const valueA = a[sortBy as keyof ToDo];
      const valueB = b[sortBy as keyof ToDo];

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const total = filteredTodos.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedTodos = filteredTodos.slice(start, end);

    return HttpResponse.json({
      items: paginatedTodos,
      total,
    });
  }),

  http.post("https://codebuddy.co/todos", async ({ request }) => {
    const newTodo = (await request.json()) as Partial<ToDo>;

    if (!newTodo.name) {
      return HttpResponse.json(
        { message: "'name' field is required." },
        { status: 400 }
      );
    }

    const id = `${todos.length + 1}`;
    const createdTodo: ToDo = { id, name: newTodo.name };
    todos.push(createdTodo);

    return HttpResponse.json({
      message: "Todo added successfully.",
      todo: createdTodo,
    });
  }),

  http.put("https://codebuddy.co/todos", async ({ request }) => {
    const updatedTodo = (await request.json()) as Partial<ToDo>;

    if (!updatedTodo.id || !updatedTodo.name) {
      return HttpResponse.json(
        { message: "'id' and 'name' fields are required." },
        { status: 400 }
      );
    }

    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);

    if (index === -1) {
      return HttpResponse.json(
        { message: `Todo with id '${updatedTodo.id}' not found.` },
        { status: 404 }
      );
    }

    todos[index] = { ...todos[index], ...updatedTodo };

    return HttpResponse.json({
      message: "Todo updated successfully.",
      todo: todos[index],
    });
  }),

  http.delete("https://codebuddy.co/todos/:id", ({ params }) => {
    const { id } = params;
    const initialLength = todos.length;

    todos = todos.filter((todo) => todo.id !== id);

    if (todos.length === initialLength) {
      return HttpResponse.json(
        { message: `Todo with id '${id}' not found.` },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      message: `Todo with id '${id}' deleted successfully.`,
    });
  }),
];
