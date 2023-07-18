import { connectToDB } from "/utils/database";
import Product from "/models/product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export const POST = async (req) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  const { userId, title, description, price, images, category, properties } =
    await req.json();
  console.log(userId, title, description, price, images, category, properties);
  const categoryId = category ? new mongoose.Types.ObjectId(category) : null;
  try {
    await connectToDB();
    const newProduct = new Product({
      creator: userId,
      title,
      description,
      price,
      images,
      category: categoryId,
      properties,
    });
    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new product", { status: 500 });
  }
};
