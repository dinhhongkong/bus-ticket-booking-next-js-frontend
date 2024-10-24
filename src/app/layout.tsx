import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { AuthProvider } from "@/context/AuthContextProvider";
import { NotificationProvider } from "@/context/NotificationContextProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NotificationProvider>
        <AuthProvider>
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </AuthProvider>
      </NotificationProvider>
    </html>
  );
}
