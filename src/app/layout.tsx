import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "马踏镇 · 广东茂名电白",
  description: "介绍广东省茂名市电白区马踏镇的风土人情、习俗、人口、地理位置、美食人文、经济与宫罗岭。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning className="theme-matang">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-matang`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
