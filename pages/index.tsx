import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@mantine/core";
import { ToDo } from "components/ToDo";
import { RegisterForm } from "components/RegisterForm";

export default function Home() {
  return (
    <div className="p-4">
      <RegisterForm />
      <ToDo />
    </div>
  );
}
