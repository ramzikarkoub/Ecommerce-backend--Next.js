import { connectToDB } from "/utils/database";
import Category from "/models/category";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const POST = async (req) => {
  const { name, parentCategory, properties } = await req.json();
  // console.log(session);

  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();
    const newCategory = new Category({
      name,
      parentCategory: parentCategory || undefined,
      properties,
    });
    await newCategory.save();
    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new category", { status: 500 });
  }
};
