import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between">
      {/* <button onClick={() => signOut()}>log out</button> */}
      <h2 className="text-pink-900">
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black  rounded-lg overflow-hidden">
        <img
          src={session?.user?.image}
          className="h-8 w-8 "
          referrerPolicy="no-referrer"
        />
        <span className="px-2 pt-1">{session?.user?.name}</span>
      </div>
    </div>
  );
}
