import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Image from "next/image";

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
            <header className="border-b border-neutral-800 p-4">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <a href="/" className="flex items-center hover:opacity-80 transition">
                  <Image 
                    src="/level10_logo_cleaned.png" 
                    alt="Level 10 Financial" 
                    width={180} 
                    height={50}
                    priority
                    className="h-12 w-auto"
                  />
                </a>
                <nav className="space-x-4 text-sm">
                  <a href="/how-it-works" className="hover:text-green-400 transition">How It Works</a>
                  <a href="/pricing" className="hover:text-green-400 transition">Pricing</a>
                  <a href="/login" className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold">Login</a>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          <footer className="border-t border-neutral-800 p-6 text-xs text-center text-neutral-400">
            <div className="mb-2">
              © {new Date().getFullYear()} Level 10 Financial · FCRA / GLBA / DPPA Compliant
            </div>
            <div>
              A <a href="https://pitchmarketingagency.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Pitch Marketing Strategies & Public Relations</a> Company
            </div>
          </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
