import Background from "@/components/Background";
import { UserSyncProvider } from "@/components/UserSyncProvider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

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
