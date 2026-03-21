import type { Metadata } from "next";
import { VT323, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "./config";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const shareTech = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
});

export const metadata: Metadata = {
  title: "notwatermango | Personal Website",
  description: "Personnel File & Blog of notwatermango",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${shareTech.variable}`}>
      <body className="crt vignette antialiased flex flex-col items-center selection:bg-accent selection:text-background">
        <header className="w-full max-w-4xl p-6 border-b border-primary/30 mb-0 md:mb-8 mt-4 z-10 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="hover:text-accent transition-colors">
              <h1
                className="text-4xl font-heading tracking-widest uppercase"
                style={{ textShadow: "0 0 10px rgba(255, 176, 0, 0.5)" }}
              >
                notwatermango.cc
              </h1>
            </Link>
            <nav className="flex gap-6 font-heading text-2xl">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-accent hover:underline decoration-accent underline-offset-4 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="w-full max-w-4xl p-6 grow z-10 relative">{children}</main>
        <footer className="w-full max-w-4xl p-6 border-t border-primary/30 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 z-10 relative text-sm font-mono">
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="opacity-70">
            &copy; {new Date().getFullYear()} notwatermango. Made with ❤️ for Steins;Gate
          </div>
        </footer>
      </body>
    </html>
  );
}
