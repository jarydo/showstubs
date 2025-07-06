import type { Metadata } from "next";
import { applause, liebeheide } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShowStubs",
  description: "Generate ticket stubs from your concert history",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${applause.variable} ${liebeheide.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
