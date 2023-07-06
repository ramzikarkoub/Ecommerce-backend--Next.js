import { connectToDB } from "/utils/database";
import Category from "/models/category";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (request) => {
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();
    const categories = await Category.find().populate("parentCategory");
    return new Response(JSON.stringify(categories), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch all categories", {
      status: 500,
    });
  }
};

// // DELETE
// export const DELETE = async (req) => {
//   const query = req.query;
//   const { id } = query;
//   try {
//     await connectToDB();

//     // Find the prompt by ID and remove it
//     await Category.findByIdAndRemove({ _id: id });

//     return new Response("Product deleted successfully", { status: 200 });
//   } catch (error) {
//     return new Response("Error deleting Category", { status: 500 });
//   }
// };
