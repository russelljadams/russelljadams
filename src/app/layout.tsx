import type { Metadata } from "next";
import { Fira_Code, Chakra_Petch, Outfit } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Russell J. Adams | Cybersecurity & Technical Operations",
  description:
    "Veteran technician and aspiring cybersecurity professional. Air Force intelligence analyst turned field tech turned security enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaCode.variable} ${chakraPetch.variable} ${outfit.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
