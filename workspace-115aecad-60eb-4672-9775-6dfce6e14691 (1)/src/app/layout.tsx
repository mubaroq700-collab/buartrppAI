import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RPP AI Pagurukiki - Pembuat RPP Otomatis",
  description: "Buat Rencana Pelaksanaan Pembelajaran (RPP) secara otomatis dengan bantuan AI untuk Kurikulum Merdeka",
  keywords: ["RPP", "AI", "Kurikulum Merdeka", "Pendidikan", "Guru", "Pembelajaran", "Pagurukiki"],
  authors: [{ name: "RPP AI Pagurukiki" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "RPP AI Pagurukiki",
    description: "Buat RPP otomatis dengan AI untuk Kurikulum Merdeka",
    url: "https://chat.z.ai",
    siteName: "RPP AI Pagurukiki",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RPP AI Pagurukiki",
    description: "Buat RPP otomatis dengan AI untuk Kurikulum Merdeka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
