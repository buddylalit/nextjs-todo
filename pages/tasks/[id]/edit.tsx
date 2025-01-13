import { TaskForm } from "components/TaskForm";
import { useTasks } from "context/tasks";
import { useRouter } from "next/router";
import { TaskFormValues } from "types/task";

export default function EditTask() {
  const { tasks, updateTask } = useTasks();
  const router = useRouter();
  const { id } = router.query;
  const task = tasks.find((_task) => _task.id === id);

  const handleSubmit = (data: TaskFormValues) => {
    updateTask(data);
    router.push("/tasks");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm onSubmit={handleSubmit} task={task} />
    </div>
  );
}
