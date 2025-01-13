import Link from "next/link";
import { useState, useEffect } from "react";
import { TaskFormValues } from "types/task";

let tasks: TaskFormValues[] = [
  { id: "1", title: "Task 1", description: "Description of Task 1" },
  { id: "2", title: "Task 2", description: "Description of Task 2" },
];

export const getTasks = () => tasks;

export const addTask = (task: TaskFormValues) => {
  tasks.push(task);
};

export const updateTask = (updatedTask: TaskFormValues) => {
  tasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
};

export const deleteTask = (id: string) => {
  tasks = tasks.filter((task) => task.id !== id);
};

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskFormValues[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleDelete = (id: string) => {
    deleteTask(id);
    setTasks(getTasks()); // Refresh the tasks list
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <Link href="/tasks/new">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
          Add New Task
        </button>
      </Link>
      <div className="space-y-4">
        {tasks.length === 0 && <p>No tasks available</p>}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded shadow"
          >
            <div>
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/tasks/${task.id}/edit`}>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
