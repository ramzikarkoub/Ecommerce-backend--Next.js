"use client";

import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import UserInfo from "./components/UserInfo";

const Home = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex justify-center">
        <button className="btn-primary" onClick={() => signIn("google")}>
          Sign in
        </button>
      </div>
    );
  }
  return (
    <>
      <UserInfo />
    </>
  );
};

export default Home;

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

// const Nav = () => {
//   const { data: session } = useSession();

//   const [providers, setProviders] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const res = await getProviders();
//       setProviders(res);
//     })();
//   }, []);
//   console.log(session);
//   return (
//     <nav className="flex-between w-full mb-16 pt-3">
//       {/* Desktop Navigation */}
//       <div className="">
//         {session?.user ? (
//           <div className="flex gap-3 md:gap-5">
//             <button type="button" onClick={signOut} className="outline_btn">
//               Sign Out
//             </button>

//             <Link href="/profile">
//               <Image
//                 src={session?.user.image}
//                 width={37}
//                 height={37}
//                 className="rounded-full"
//                 alt="profile"
//               />
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="bg-blue-900 w-screen h-screen flex items-center">
//               <div className="text-center w-full">
//                 {providers &&
//                   Object.values(providers).map((provider) => (
//                     <button
//                       className="bg-white rounded-lg px-4 p-2"
//                       onClick={() => {
//                         signIn(provider.id);
//                       }}
//                       key={provider.name}
//                     >
//                       Login with google
//                     </button>
//                   ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Nav;
