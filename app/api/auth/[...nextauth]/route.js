import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "models/user";
import { connectToDB } from "utils/database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session: session, token, user }) => {
      console.log("sesssssssssion", token, user);
      try {
        await connectToDB();
        // console.log("sessionnsssssss", session);
        // check if user already exists
        const userExistInDB = await User.findOne({
          email: session?.user?.email,
        });
        if (userExistInDB) {
          return session;
        }
        console.log("sessssssssssss", session);
      } catch (error) {
        console.log("Error: ", error.message);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
