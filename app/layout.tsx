import "./global.css";
import "@/app/vision-pro-ui.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Vision OS",
  description: "Design similar to Apple Vision Pro Operating System",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
} satisfies Metadata;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
          {children}
      </body>
    </html>
  );
}
