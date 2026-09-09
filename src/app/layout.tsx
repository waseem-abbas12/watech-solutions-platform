import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { MobileBottomNav } from "@/components/common/mobile-bottom-nav";
import { AiAssistantWidget } from "@/components/common/ai-assistant-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Watech Ecosystem | Real Estate · Furniture · Events",
  description:
    "Integrated ecosystem platform combining Real Estate properties, Chinioti luxury wood furniture, signature events, and digital agency services.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Watech",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-slate-900 selection:text-white pb-14 md:pb-0">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <MobileBottomNav />
        <AiAssistantWidget />

        {/* PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Watech PWA Service Worker registered successfully:', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
