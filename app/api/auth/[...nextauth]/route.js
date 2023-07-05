// // import clientPromise from "@/util/mongodb";
// import { connectToDB } from "utils/database";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
// });

// export { handler as GET, handler as POST };

// the new script that works great
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "models/user";
import { connectToDB } from "utils/database";
const admminList = [
  "karkoub.ramzi@gmail.com",
  "karkoub.ramzi2@gmail.com, karkoub.ashley@gmail.com",
];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    // async signIn({ account, profile, user, credentials }) {
    //   try {
    //     await connectToDB();
    //     console.log("profileee", profile);
    //     // check if user already exists
    //     const userExistInDB = await User.findOne({ email: profile.email });
    //     if (userExistInDB) {
    //       return true;
    //     }
    //   } catch (error) {
    //     console.log("Error checking if user exists: ", error.message);
    //     return false;
    //   }
    // },
    session: async ({ session, token, user }) => {
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

// export async function isAdminRequest(req, res) {
//   const sess = await getServerSession(authOptions);
//   console.log("seeeeeeeeeeees", sess);

//   await connectToDB();

//   if (sess === null) return;
// }

//this is the old script
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User from "models/user";
// import { connectToDB } from "utils/database";
// const AdmminEmails = ["karkoub.ramzi@gmail.com", "karkoub.ramzi2@gmail.com"];

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       // store the user id from MongoDB to session
//       const sessionUser = await User.findOne({ email: session.user.email });
//       session.user.id = sessionUser._id.toString();

//       return session;
//     },
//     async signIn({ account, profile, user, credentials }) {
//       try {
//         await connectToDB();

//         // check if user already exists
//         const userExists = await User.findOne({ email: profile.email });

//         // if not, create a new document and save user in MongoDB
//         if (!userExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(" ", "").toLowerCase(),
//             image: profile.picture,
//           });
//         }

//         return true;
//       } catch (error) {
//         console.log("Error checking if user exists: ", error.message);
//         return false;
//       }
//     },
//   },
// });

// export { handler as GET, handler as POST };
