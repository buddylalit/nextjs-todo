import { http, HttpResponse } from "msw";
import { ToDo } from "types";

let todos: ToDo[] = [];

export const handlers = [
  http.get("https://codebuddy.co/todos", () => {
    return HttpResponse.json(todos);
  }),
  http.post("https://codebuddy.co/todos", async ({ request }) => {
    const newTodo = (await request.json()) as Partial<ToDo>;
    const id = `${todos.length + 1}`;
    if (!newTodo.name) {
      return HttpResponse.json(
        { message: "Invalid data: 'name' field is required" },
        { status: 400 }
      );
    }

    todos.push({
      id,
      name: newTodo.name,
    });
    return HttpResponse.json({
      message: "Todo added successfully",
      todos,
    });
  }),

  http.delete("https://codebuddy.co/todos/:id", ({ params }) => {
    const { id } = params;
    const initialLength = todos.length;
    todos = todos.filter((item) => item.id !== id);

    if (todos.length === initialLength) {
      return HttpResponse.json(
        {
          message: `Todo with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      message: `Todo with id ${id} deleted successfully`,
      todos,
    });
  }),
];
