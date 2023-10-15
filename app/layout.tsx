import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { HeaderBreadCrumbs } from "@/components/HeaderBreadCrumbs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yahoo Points Calculator",
  description: "Yahoo Fantasy Baseball Points Calculator",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen flex flex-col")}>
        <header className="border-b border-border flex gap-8 py-2 px-8 items-center">
          <Link href="/" className="prose-base">
            Home
          </Link>
          <Separator orientation="vertical" className="h-8" />
          <HeaderBreadCrumbs />
        </header>
        <main className="px-8 py-4 h-[calc(100%-49px)]">{children}</main>
      </body>
    </html>
  );
}
