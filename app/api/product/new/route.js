import { connectToDB } from "/utils/database";
import Product from "/models/product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export const POST = async (req) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  const { userId, title, description, price, images, category, properties } =
    await req.json();
  try {
    await connectToDB();
    const newProduct = new Product({
      creator: userId,
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new product", { status: 500 });
  }
};
