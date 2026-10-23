import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.bio,
  openGraph: {
    type: "website",
    siteName: `${profile.name} — Portfolio`,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="min-h-full flex flex-col">
        <Nav name={profile.name} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
