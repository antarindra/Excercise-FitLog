import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/shared/Navbar";
import WorkoutProvider from "@/context/WorkoutProvider";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FITLOG - Workout Companion",
  description: "Track your lifts and manage your daily fitness plan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#121318] text-white">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ToastContainer position="bottom-right" theme="dark" />
        </WorkoutProvider>
      </body>
    </html>
  );
}