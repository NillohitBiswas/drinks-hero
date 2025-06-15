import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "Thamaside Brewry Co. // Brew App",
  description: "Created by nillohit",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

