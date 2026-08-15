import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { images } from "@/content/landing";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Fine Technology — Power backup & solar integration";
const description =
  "Indigenous tech and contracting for solar, inverters, UPS, and integrated power backup across Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — Fine Technology",
    default: title,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Fine Technology",
    title,
    description,
    images: [{ url: images.heroHouse, width: 1200, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [images.heroHouse],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/technovier"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
