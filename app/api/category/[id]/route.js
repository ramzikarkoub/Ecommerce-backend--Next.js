import { connectToDB } from "/utils/database";
import Category from "/models/category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "../../auth/[...nextauth]/route";

// DELETE
export const DELETE = async (req, { params }) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  console.log(params);
  try {
    await connectToDB();

    // Find the existing category by ID and remove it
    await Category.findByIdAndRemove(params.id);

    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Category", { status: 500 });
  }
};

//UPDATE
export const PATCH = async (req, { params }) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  const { name, parentCategory, properties } = await req.json();
  try {
    await connectToDB();
    const existingCategory = await Category.findById(params.id);
    if (!existingCategory) {
      return new Response("Category not found", { status: 404 });
    }
    existingCategory.name = name;
    existingCategory.parentCategory = parentCategory || undefined;
    existingCategory.properties = properties;
    await existingCategory.save();
    return new Response("Successfully updated the category", { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new category", { status: 500 });
  }
};
