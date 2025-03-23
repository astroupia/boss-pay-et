import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import RegisterSW from "@/components/pwa/register-sw";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BossPayet - Mobile Banking",
  description: "Modern mobile banking solution",
  manifest: "/manifest.json",
  themeColor: "#0a0b25",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BossPayet",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <RegisterSW />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
