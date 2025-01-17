import { TextInput, Button, Paper, Title, Container } from "@mantine/core";
import { useStore } from "stores/useStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
});

export function RegisterForm() {
  const { setUser, name, email, logout } = useStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: { name: string; email: string }) => {
    setUser(data.name, data.email);
    reset();
  };

  return (
    <Container size="sm">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {name ? (
          <>
            <Title order={3}>Welcome, {name}!</Title>
            <p className="text-gray-500 mb-4">Email: {email}</p>
            <Button onClick={logout} variant="light" color="red" fullWidth>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Title order={3} className="mb-4">
              Register
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                label="Name"
                placeholder="Enter your name"
                {...register("name")}
                error={errors.name?.message}
                className="mb-4"
              />
              <TextInput
                label="Email"
                placeholder="Enter your email"
                {...register("email")}
                error={errors.email?.message}
                className="mb-4"
              />
              <Button type="submit" variant="filled" fullWidth>
                Register
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}
