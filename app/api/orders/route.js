import { connectToDB } from "/utils/database";
import Order from "/models/order";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req, res) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch all products", {
      status: 500,
    });
  }
};
