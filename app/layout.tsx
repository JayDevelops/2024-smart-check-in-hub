import './globals.css'
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "@/app/QueryClientProvider";
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
      <html lang="en" suppressHydrationWarning>
          <head />
          <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <QueryClientProvider>
              <AuthProvider>
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
              </AuthProvider>
          </QueryClientProvider>
          </body>
          </html>
    )
}
