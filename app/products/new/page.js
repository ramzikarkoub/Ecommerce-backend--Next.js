"use client";
import Form from "/app/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const { data: session } = useSession();
  // const router = useRouter();

  return (
    <div>
      <h1>New product</h1>
      <Form />
    </div>
  );
}
