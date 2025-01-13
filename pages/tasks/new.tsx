import { TaskForm } from "components/TaskForm";
import { useTasks } from "context/tasks";
import { useRouter } from "next/router";
import { TaskFormValues } from "types/task";

export default function NewTask() {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleSubmit = (data: TaskFormValues) => {
    addTask(data);
    router.push("/tasks");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
