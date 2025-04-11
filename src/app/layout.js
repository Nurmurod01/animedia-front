import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Animedia",
  description: "Watch the latest anime and TV shows on our streaming platform",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0f0f1a] to-[#1a1a3a]">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
