import Background from "@/components/Background";
import { UserSyncProvider } from "@/components/UserSyncProvider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synced",
  description: "The All-In-One App for Couples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <UserSyncProvider>
            <Background>
              <Toaster />
              {children}
            </Background>
          </UserSyncProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
