
'use client'

import { useSession } from "next-auth/react";

export default async function Home() {
  return (
    <>
      <h1 className="text-5xl">You Shall Not Pass!</h1>
    </>
  );
}
