import { Inter } from "next/font/google";
import "../globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "@/components/Navbar";
import Enforce from "@/util/enforce";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`bg-white ${inter.className}`}>
          <Navbar loggedIn/>
          <Enforce>{children}</Enforce>
        </body>
      </UserProvider>
    </html>
  );
}
