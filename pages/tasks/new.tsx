import { TaskForm } from "components/TaskForm";
import { useRouter } from "next/router";
import { TaskFormValues } from "types/task";

export default function NewTask() {
  const router = useRouter();

  const handleSubmit = (data: TaskFormValues) => {
    console.log("New Task Data:", data);
    router.push("/tasks");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
