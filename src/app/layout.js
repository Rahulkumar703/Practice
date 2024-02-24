import { Actor } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/Providers";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from "@/components/ui/sonner"
const actor = Actor({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Practice makes perfect",
  description: "A tool for tracking DSA Progress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={actor.className}>
        <Providers>
          <main className="grid">
            <section className="mx-auto max-w-5xl w-full min-h-screen flex flex-col">
              <Header />
              <div className="p-2 py-10 h-full">
                {children}
              </div>
              <Footer />
            </section>

            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
