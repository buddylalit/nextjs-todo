import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@mantine/core";
import { ToDo } from "components/ToDo";

export default function Home() {
  console.log("DATA", process.env.NEXT_PUBLIC_DATA);

  return (
    <div>
      <ToDo />
    </div>
  );
}
