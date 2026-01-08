import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Level10 Financial",
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
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-neutral-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between">
              <span className="font-bold text-xl">LEVEL10</span>
              <nav className="space-x-4 text-sm">
                <a href="/how-it-works">How It Works</a>
                <a href="/pricing">Pricing</a>
                <a href="/login">Login</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-neutral-800 p-4 text-xs text-center">
            © {new Date().getFullYear()} Level10 Financial · FCRA / GLBA / DPPA Compliant
          </footer>
        </div>
      </body>
    </html>
  );
}
