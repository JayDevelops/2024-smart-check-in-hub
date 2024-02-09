import './globals.css'
import { ClerkProvider} from "@clerk/nextjs";
import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google";
import React from "react";
import {cn} from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import NavBar from "@/components/Navigation/NavBar";

 const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Smart Checkin',
  description: 'Check-In/Check-Out users from your organization!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
          <html lang="en" suppressHydrationWarning>
          <head />
          <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              <NavBar />
              <main className="md:container md:mx-auto p-4 overflow-y-hidden">
                  {children}
              </main>
              <Toaster />
          </ThemeProvider>
          </body>
          </html>
      </ClerkProvider>
)
}
