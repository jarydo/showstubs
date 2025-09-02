import type { Metadata } from "next";
import { applause, liebeheide, stampete } from "@/lib/fonts";
import favicon from "./favicon.ico";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShowStubs",
  description: "Generate ticket stubs from your concert history",
  icons: {
    icon: [
      { url: favicon.src, sizes: "16x16", type: "image/x-icon" },
      { url: favicon.src, sizes: "32x32", type: "image/x-icon" },
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
          dangerouslySetInnerHTML={{
            __html: `
              window.va =
                window.va ||
                function () {
                  (window.vaq = window.vaq || []).push(arguments);
                };
            `,
          }}
        />
        <script
          defer
          src="https://showstubs-jaryd-diamonds-projects.vercel.app/_vercel/insights/script.js"
        ></script>
      </head>
      <body
        className={`${applause.variable} ${liebeheide.variable} ${stampete.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
