"use client";
import Form from "/app/components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
// import Router from "next/router";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const { data: session } = useSession();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [product, setProduct] = useState({
  //   title: "",
  //   description: "",
  //   price: "",
  //   images: [],
  // });

  const router = useRouter();
  // const createProduct = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch("/api/product/new", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         userId: session?.user.id,
  //         title: product.title,
  //         description: product.description,
  //         price: product.price,
  //       }),
  //     });
  //     if (response.ok) {
  //       alert("product created");
  //       router.push("/products");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  return (
    <div>
      <h1>New product</h1>
      <Form />
    </div>
  );
}
