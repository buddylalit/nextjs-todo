import { TaskForm } from "components/TaskForm";
import { useTasks } from "context/tasks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TaskFormValues } from "types/task";

export default function EditTask() {
  const { tasks, updateTask, getTask } = useTasks();
  const [task, setTask] = useState<TaskFormValues | undefined>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    (async () => {
      const _task = await getTask(id);
      setTask(_task);
    })();
  }, [id]);

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
