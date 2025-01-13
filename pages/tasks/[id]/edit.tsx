import { TaskForm } from "components/TaskForm";
import { useRouter } from "next/router";
import { TaskFormValues } from "types/task";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;

  const existingTask: TaskFormValues = {
    title: "Sample Task",
    description: "This is a sample task description",
  };

  const handleSubmit = (data: TaskFormValues) => {
    console.log("Edited Task Data:", data);
    router.push("/tasks");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm onSubmit={handleSubmit} defaultValues={existingTask} />
    </div>
  );
}
