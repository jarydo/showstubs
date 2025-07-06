import localFont from "next/font/local";

export const applause = localFont({
  src: [
    {
      path: "../../public/fonts/ApplauseFont.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-applause",
  display: "swap",
});

export const liebeheide = localFont({
  src: [
    {
      path: "../../public/fonts/LiebeHeide.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-liebeheide",
  display: "swap",
});

export const stampete = localFont({
  src: [
    {
      path: "../../public/fonts/Stampete.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-stampete",
  display: "swap",
});
