// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import AOSProvider from "../components/AOSProvider";
import CustomCursor from "../components/CustomCursor";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { SessionProvider } from "../app/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Youth Blood - Donate Blood, Keep the World Beating",
  description: "Join Youth Blood - A platform for young blood donors to save lives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <SessionProvider>
            <AOSProvider>
              <CustomCursor />
              <Navbar />
              {children}
              <Footer />
            </AOSProvider>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}