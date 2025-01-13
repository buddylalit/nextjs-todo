import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@mantine/core";
import { ToDo } from "components/ToDo";

export default function Home() {
  return (
    <div>
      <ToDo />
    </div>
  );
}
