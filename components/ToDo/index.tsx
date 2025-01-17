import { TextInput, Button, Paper, Title, Container } from "@mantine/core";
import { useStore } from "stores/useStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Task name is required")
    .max(100, "Task name cannot exceed 100 characters"),
});

export function ToDo() {
  const { addToDo, deleteToDo, todos } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: { name: string }) => {
    addToDo({ id: Date.now().toString(), name: data.name });
    reset();
  };

  return (
    <Container size="sm">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={3} className="mb-4">
          To-Do List
        </Title>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <TextInput
            label="New Task"
            placeholder="Enter a task"
            {...register("name")}
            error={errors.name?.message}
            className="mb-2"
          />
          <Button type="submit" fullWidth>
            Add Task
          </Button>
        </form>
        <ul className="list-disc pl-5">
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2 flex justify-between">
              {todo.name}
              <Button
                variant="light"
                color="red"
                size="xs"
                onClick={() => deleteToDo(todo.id)}
                className="ml-2"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
}
