import { connectToDB } from "/utils/database";
import Product from "/models/product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

//GET
export const GET = async (req, { params }) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();

    const product = await Product.findById(params.id).populate("creator");
    if (!product) return new Response("product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

//PATCH

export const PATCH = async (request, { params }) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  const { title, description, price, images, category, properties } =
    await request.json();

  try {
    await connectToDB();

    // Find the existing product by ID
    const existingProduct = await Product.findById(params.id);

    if (!existingProduct) {
      return new Response("product not found", { status: 404 });
    }

    // Update the product with new data
    existingProduct.title = title;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.images = images;
    existingProduct.category = category || null;
    existingProduct.properties = properties;

    await existingProduct.save();

    return new Response("Successfully updated the Product", { status: 200 });
  } catch (error) {
    console.log("hahahahhahahahh", error);
    return new Response("Error Updating Product", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();

    // Find the product by ID and remove it
    await Product.findByIdAndRemove(params.id);

    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Product", { status: 500 });
  }
};
