import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteMenu from "@/components/SiteMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Study Academy - ゲーム攻略をYouTube動画で学習",
  description: "YouTube動画から学ぶゲーム徹底攻略サイト。エルデンリング・ナイトレインの攻略情報を文字と動画で効率的に学習できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteMenu />
        {children}
      </body>
    </html>
  );
}
