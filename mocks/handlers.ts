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
  http.put("https://codebuddy.co/todos", async ({ request }) => {
    try {
      const updatedTodo = (await request.json()) as Partial<ToDo>;
      if (!updatedTodo || !updatedTodo.id) {
        return HttpResponse.json(
          {
            message: "Invalid request: 'id' is required to update a todo.",
          },
          {
            status: 404,
          }
        );
      }

      let todoUpdated = false;
      todos = todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          todoUpdated = true;
          return { ...todo, ...updatedTodo };
        }
        return todo;
      });

      if (!todoUpdated) {
        return HttpResponse.json(
          {
            message: `Todo with id '${updatedTodo.id}' not found.`,
          },
          {
            status: 404,
          }
        );
      }

      return HttpResponse.json(
        {
          message: "Todo updated successfully.",
          todos,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      return HttpResponse.json(
        {
          message: "An error occurred while updating the todo.",
        },
        {
          status: 500,
        }
      );
    }
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
