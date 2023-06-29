"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import UserInfo from "../components/UserInfo";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <UserInfo />
    </div>
  );
}
