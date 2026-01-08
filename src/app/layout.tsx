import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

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
                <a href="/" className="font-bold text-xl hover:text-green-400 transition">
                  Level 10 Financial
                </a>
                <nav className="space-x-4 text-sm">
                  <a href="/how-it-works" className="hover:text-green-400 transition">How It Works</a>
                  <a href="/pricing" className="hover:text-green-400 transition">Pricing</a>
                  <a href="/login" className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold">Login</a>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-neutral-800 p-4 text-xs text-center text-neutral-400">
              © {new Date().getFullYear()} Level 10 Financial · FCRA / GLBA / DPPA Compliant
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
