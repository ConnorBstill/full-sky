import type { Metadata } from "next";

import { Geist_Mono } from "next/font/google";

import { ThemeProvider } from "~/components/theme-provider";
import "../styles/globals.css";
import { QueryProviders } from "./providers/query-provider";

import { Toaster } from "~/components/ui/sonner";

// import { createIngester } from "~/ingester";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Data Migration",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full w-full" lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} h-full w-full antialiased`}>
        <QueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
