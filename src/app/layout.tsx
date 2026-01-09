import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Image from "next/image";
import FooterContent from "@/components/FooterContent";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Level 10 Financial",
  description: "Become Bankable. No More Denials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <FooterContent />
            <ChatWidget />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
