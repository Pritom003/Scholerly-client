import type { Metadata } from "next";
import {  Merriweather} from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import Providers from "@/providers/provider";
import NotificationListener from "@/context/NotificationListener";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})
export const metadata: Metadata = {
  title: "Scholerly",
  description: "Provides the Best tutors according to your need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${merriweather.variable} antialiased bg-[#E3E3E5]`}
      >
<Providers>
<ConfigProvider>
<Toaster richColors position="top-right" />
<NotificationListener />
          {children}
        </ConfigProvider>
</Providers>

      </body>
    </html>
  );
}
