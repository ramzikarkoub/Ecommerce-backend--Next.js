import { connectToDB } from "/utils/database";
import Product from "/models/product";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req, res) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();
    const products = await Product.find();
    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch all products", {
      status: 500,
    });
  }
};

// import { connectToDB } from "/utils/database";
// import Product from "/models/product";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// export default async function handler(req, res) {
//   const sess = await getServerSession(authOptions);
//   if (sess === null) return;
//   try {
//     await connectToDB();

//     if (req.method === "GET") {
//       const products = await Product.find();
//       return res.status(200).json(products);
//     } else if (req.method === "DELETE") {
//       const { productId } = req.query;
//       await Product.findByIdAndDelete(productId);
//       return res.status(200).json({ message: "Product deleted successfully" });
//     } else {
//       return res.status(405).json({ error: "Method Not Allowed" });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to process the request" });
//   }
// }
