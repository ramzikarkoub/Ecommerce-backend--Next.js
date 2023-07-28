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
