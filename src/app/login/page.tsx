
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Sign in to Xeref.ai</h1>
      <button className="px-3 py-2 rounded bg-black text-white" onClick={() => signIn('github')}>
        Continue with GitHub
      </button>
    </div>
  );
}
