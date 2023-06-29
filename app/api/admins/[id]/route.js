import { connectToDB } from "utils/database";
import User from "models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const DELETE = async (request, { params }) => {
  console.log("hkrhkjrtg", params);
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();

    // Find the product by ID and remove it
    await User.findByIdAndRemove(params.id);

    return new Response("Admin deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Admin", { status: 500 });
  }
};
