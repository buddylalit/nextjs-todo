import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Button } from "@mantine/core";
import { TaskFormValues } from "../../types/task";

const schema = yup.object().shape({
  id: yup.string(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

interface TaskFormProps {
  onSubmit: (data: TaskFormValues) => void;
  task?: TaskFormValues;
}

export const TaskForm = ({ onSubmit, task }: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: yupResolver(schema),
    defaultValues: task,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Title"
            placeholder="Enter task title"
            error={errors.title?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Description"
            placeholder="Enter task description"
            error={errors.description?.message}
            {...field}
          />
        )}
      />
      <Button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Submit
      </Button>
    </form>
  );
};
