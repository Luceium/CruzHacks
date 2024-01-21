import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "@/components/Navbar";
import Enforce from "@/util/enforce";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safe And Slug",
  description: "Attend UCSC events safe and snug!",
};

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`bg-white ${inter.className}`}>
          <Navbar />
          <Enforce>{children}</Enforce>
        </body>
      </UserProvider>
    </html>
  );
}
