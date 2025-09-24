import Background from "@/components/Background";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UserSyncProvider } from "@/components/UserSyncProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        <body className={`${lato.variable} antialiased`}>
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
