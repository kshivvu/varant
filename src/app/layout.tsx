import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Varant — The Ancient Council. For Modern Bets.",
  description: "Your Sabha deliberates. Your Shastra records. Your Smriti remembers. A decision accountability system for founders making irreversible bets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${inter.variable} ${playfair.variable} ${lora.variable} font-[family-name:var(--font-inter)] antialiased bg-[#F5F5F7] text-[#3D3D3D] min-h-screen selection:bg-[#E8711A]/20 selection:text-[#E8711A] relative overflow-x-hidden`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}