import { http, HttpResponse } from "msw";
import { TaskFormValues } from "types/task";

let tasks: TaskFormValues[] = [];

export const handlers = [
  http.get("https://codebuddy.co/tasks", () => {
    return HttpResponse.json(tasks);
  }),
  http.post("https://codebuddy.co/tasks", async ({ request }) => {
    const newTask = (await request.json()) as Partial<TaskFormValues>;
    const id = `${tasks.length + 1}`;
    if (!newTask.title || !newTask.description) {
      return HttpResponse.json(
        {
          message:
            "Invalid data: 'title' and 'description' fields are required",
        },
        { status: 400 }
      );
    }

    tasks.push({
      id,
      title: newTask.title,
      description: newTask.description,
    });
    return HttpResponse.json({
      message: "Task added successfully",
      tasks,
    });
  }),

  http.put("https://codebuddy.co/tasks/:id", async ({ params, request }) => {
    const { id } = params;
    const updatedTask = (await request.json()) as Partial<TaskFormValues>;
    if (!updatedTask.title || !updatedTask.description) {
      return HttpResponse.json(
        {
          message:
            "Invalid data: 'title' and 'description' fields are required",
        },
        { status: 400 }
      );
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: `Task with id ${id} not found` },
        { status: 404 }
      );
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: updatedTask.title,
      description: updatedTask.description,
    };

    return HttpResponse.json({
      message: `Task with id ${id} updated successfully`,
      task: tasks[taskIndex],
    });
  }),

  http.delete("https://codebuddy.co/tasks/:id", ({ params }) => {
    const { id } = params;
    const initialLength = tasks.length;
    tasks = tasks.filter((item) => item.id !== id);

    if (tasks.length === initialLength) {
      return HttpResponse.json(
        {
          message: `Task with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      message: `Task with id ${id} deleted successfully`,
      tasks,
    });
  }),
];
