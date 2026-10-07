import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolify AI — Turn Your Resume Into a Professional Portfolio",
  description:
    "Upload your resume, let AI organize your experience, choose a design, and publish a professional portfolio website in minutes.",
  keywords: [
    "AI portfolio builder",
    "resume to portfolio",
    "developer portfolio",
    "professional website builder",
    "resume parser",
  ],
  authors: [{ name: "Portfolify AI" }],
  openGraph: {
    title: "Portfolify AI — Turn Your Resume Into a Professional Portfolio",
    description:
      "Upload your resume, let AI organize your experience, choose a design, and publish a professional portfolio website in minutes.",
    type: "website",
    url: "https://portfolify.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolify AI — Turn Your Resume Into a Professional Portfolio",
    description:
      "Upload your resume, let AI organize your experience, choose a design, and publish a professional portfolio website in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] font-sans antialiased selection:bg-[#2D5D60]/20 selection:text-[#2D5D60]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
