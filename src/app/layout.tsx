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
    "Security-focused technician with CEH and Google Cybersecurity certifications. Air Force intelligence veteran with 10+ years of network and telecom experience.",
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
