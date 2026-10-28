import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opara Drive Gallery | Luxury & Performance Vehicles",
  description: "Lagos' premier destination for luxury, performance, and imported vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-50 font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
