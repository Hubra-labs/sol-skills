import type { Metadata } from "next";
import Image from "next/image";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/structured-data";
import { repoUrl } from "@/lib/project";
import {
  absoluteUrl,
  buildPageMetadata,
  getSiteUrl,
  siteDescription,
  siteName,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteName,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: buildPageMetadata({
    description: siteDescription,
    path: "/",
  }).keywords,
  alternates: {
    canonical: "/",
  },
  category: "developer tools",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: buildPageMetadata({
    description: siteDescription,
    path: "/",
  }).openGraph,
  twitter: buildPageMetadata({
    description: siteDescription,
    path: "/",
  }).twitter,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    description: siteDescription,
    url: getSiteUrl(),
    logo: absoluteUrl("/logo.png"),
  };

  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <StructuredData data={organizationSchema} />
        <header className="border-b border-zinc-900/80">
          <div className="mx-auto flex w-full items-center justify-between px-6 py-3">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-100">
              <Image src="/logo.png" alt="Skills" width={32} height={32} className="size-8" />
              <span>SOL Skills</span>
            </Link>
            <nav className="flex items-center gap-4 text-xs text-zinc-500">
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/60 px-2.5 py-1.5 text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-200"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-3.5 fill-current"
                >
                  <path d="M12 .5C5.65.5.5 5.7.5 12.1c0 5.1 3.3 9.5 7.9 11 .6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.4 1.3 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.4-1.3 3.4-1.3.7 1.7.3 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.9 7.9-11C23.5 5.7 18.3.5 12 .5Z" />
                </svg>
                <span>GitHub</span>
              </a>
              <Link
                href="/submit"
                className="rounded-md bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_8px_24px_rgba(124,58,237,0.35)] transition hover:bg-violet-500 hover:shadow-[0_0_0_1px_rgba(196,181,253,0.6),0_10px_28px_rgba(139,92,246,0.45)]"
              >
                Submit your Solana skill
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t border-zinc-900/80">
          <div className="mx-auto flex w-full items-center justify-center px-6 py-6 text-xs text-zinc-500">
            <span>
              Built by{" "}
              <a
                href="https://hubra.app"
                target="_blank"
                rel="noopener"
                className="text-zinc-300 underline-offset-4 transition hover:text-violet-400 hover:underline"
              >
                Hubra team
              </a>
            </span>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
