import { connectToDB } from "utils/database";
import User from "models/user";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "../auth/[...nextauth]/route";

export const GET = async (req, res) => {
  // console.log("hkrhkjrtg", params);
  const sess = await getServerSession(authOptions);
  if (sess === null) return;
  try {
    await connectToDB();
    const admins = await User.find();
    return new Response(JSON.stringify(admins), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch all admins", {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  const sess = await getServerSession(authOptions);

  if (sess === null) return;
  const { adminEmail, userName, image } = await req.json();

  try {
    await connectToDB();

    const newUser = new User({
      email: adminEmail,
      username: userName,
      image,
    });
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log("eroor", error);
    return new Response("Failed to create a new user", { status: 500 });
  }
};
