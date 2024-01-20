import Image from "next/image";
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
  const session = await getSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href={session ? "/api/auth/logout" : "/api/auth/login"}>{session ? "Logout" : "Login"}</a>
      <>{session ? "Logged in as " + session.user.name : "Not logged in"}</>
    </main>
  );
}
