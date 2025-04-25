// app/layout.tsx
import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import Providers from "@/providers/provider"; // client component
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} antialiased bg-[#E3E3E5]`}>
        <ConfigProvider>
         
          <Providers>
            {children}
          </Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
