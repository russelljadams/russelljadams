import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Russell J. Adams — Year One",
    template: "%s | Russell J. Adams",
  },
  description:
    "Year One: An Elite Skill Acquisition Experiment. A 1200-Hour Case Study in Deliberate Practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} font-mono antialiased min-h-screen`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
