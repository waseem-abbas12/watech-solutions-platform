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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.waseemabbas.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WATECH | Digital Marketing, Technology & Business Marketplace in Pakistan",
    template: "%s | WATECH Solutions",
  },
  description:
    "WATECH is Pakistan's integrated multi-sector growth platform connecting Real Estate properties, authentic Chinioti wood furniture, and Food & Catering with modern digital services and automation.",
  keywords: [
    "Watech Solutions",
    "Real Estate Pakistan",
    "Chinioti Furniture",
    "Food and Catering Pakistan",
    "Pakwan Center Lahore",
    "Digital Marketing Agency Pakistan",
    "WhatsApp Automation Pakistan",
    "Property Portal Pakistan",
  ],
  authors: [{ name: "Watech Solutions", url: siteUrl }],
  creator: "Watech Solutions",
  publisher: "Watech Solutions",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "WATECH | Digital Marketing, Technology & Business Marketplace in Pakistan",
    description:
      "Integrated ecosystem platform combining Real Estate properties, Chinioti luxury wood furniture, Food & Catering, and digital agency services.",
    url: siteUrl,
    siteName: "WATECH Solutions Platform",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WATECH | Multi-Sector Platform & Digital Agency in Pakistan",
    description:
      "Powering Pakistan's Real Estate, Chinioti Woodcraft, and Food & Catering through modern technology.",
  },
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
      <head>
        {/* Global Organization & WebSite JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "WATECH Solutions",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/favicon.ico`,
                  },
                  description:
                    "Pakistan's multi-sector growth ecosystem connecting Real Estate, Chinioti furniture, and signature events with technology.",
                  email: "waseem000094@gmail.com",
                  telephone: "+923270831470",
                  sameAs: [
                    "https://wa.me/923270831470",
                    "https://waseemabbas.online",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lahore",
                    addressRegion: "Punjab",
                    addressCountry: "PK",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "WATECH Solutions",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                  inLanguage: "en-PK",
                },
              ],
            }),
          }}
        />
      </head>
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
