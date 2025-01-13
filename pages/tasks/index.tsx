import { useTasks } from "context/tasks";
import Link from "next/link";

export default function Tasks() {
  const { deleteTask, tasks } = useTasks();
  const handleDelete = (id: string) => {
    deleteTask(id);
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
                onClick={() => handleDelete(task.id!)}
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
