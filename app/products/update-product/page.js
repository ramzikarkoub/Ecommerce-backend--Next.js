"use client";
import Form from "/app/components/Form";
import { useState, useEffect } from "react";

// import Router from "next/router";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpdateProduct() {
  const [product, setProduct] = useState(null);

  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch(`/api/product/${productId}`);
      const data = await response.json();
      console.log(data);
      setProduct(data);
      console.log(response);
    };

    if (productId) getProductDetails();
  }, [productId]);

  return (
    <div>
      <h1>Edit product</h1>
      {product && <Form {...product} />}
    </div>
  );
}
