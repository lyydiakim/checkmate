import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav.js";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CheckMates",
  description: "Making reciept splitting fun and efficient!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gradient-to-b from-cyan-950 to-cyan-900">
      <body className="font-questrial overflow-x-hidden w-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
