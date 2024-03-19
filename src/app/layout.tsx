import { Navbar } from "@/app/_components/navbar";
import { cn, constructMetadata } from "@/lib/utils";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Footer } from "./_components/footer";
import Providers from "./_components/providers/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex min-h-screen flex-col">
          <Providers>
            <Navbar />
            <div className="flex-1 flex-grow">{children}</div>
            <Footer />
          </Providers>
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
