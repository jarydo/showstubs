import type { Metadata } from "next";
import { applause, liebeheide, stampete } from "@/lib/fonts";
import favicon from "./favicon.ico";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShowStubs",
  description: "Generate ticket stubs from your concert history",
  icons: {
    icon: [
      { url: favicon.src, sizes: '16x16', type: 'image/x-icon' },
      { url: favicon.src, sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://va.vercel-scripts.com/v1/script.debug.js"
          data-endpoint="https://va.vercel-scripts.com/v1/script.debug.js"
        />
      </head>
      <body
        className={`${applause.variable} ${liebeheide.variable} ${stampete.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
