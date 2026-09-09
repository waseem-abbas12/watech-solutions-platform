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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/logo.svg", type: "image/svg+xml" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google26f686f9ab4c2d7a",
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
        {/* Global Organization, LocalBusiness (GMB Rank Booster) & WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
                  "@id": `${siteUrl}/#organization`,
                  name: "WATECH Solutions - Growth Ecosystem",
                  alternateName: "Watech Solutions Platform",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/icons/logo.svg`,
                  },
                  image: `${siteUrl}/icons/logo.svg`,
                  description:
                    "Pakistan's premier multi-sector growth ecosystem combining Real Estate properties, authentic handcrafted Chinioti Sheesham furniture, Food & Catering, and high-performance digital services & AI automation.",
                  email: "waseem000094@gmail.com",
                  telephone: "+923270831470",
                  priceRange: "PKR",
                  currenciesAccepted: "PKR",
                  paymentAccepted: "Cash, Bank Transfer, JazzCash, EasyPaisa",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Katchery Road / Main Market",
                    addressLocality: "Chiniot",
                    addressRegion: "Punjab",
                    postalCode: "35400",
                    addressCountry: "PK",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 31.7200,
                    longitude: 72.9789,
                  },
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      opens: "09:00",
                      closes: "21:00",
                    },
                  ],
                  areaServed: [
                    { "@type": "City", name: "Chiniot" },
                    { "@type": "City", name: "Lahore" },
                    { "@type": "City", name: "Faisalabad" },
                    { "@type": "City", name: "Islamabad" },
                    { "@type": "City", name: "Rawalpindi" },
                    { "@type": "City", name: "Karachi" },
                    { "@type": "Country", name: "Pakistan" },
                  ],
                  sameAs: [
                    "https://wa.me/923270831470",
                    "https://waseemabbas.online",
                    "https://www.waseemabbas.online",
                  ],
                  founder: {
                    "@type": "Person",
                    name: "Waseem Abbas",
                    jobTitle: "Founder & Chief Executive Officer",
                    image: `${siteUrl}/images/founder-waseem-abbas.jpg`,
                    url: "https://waseemabbas.online",
                    sameAs: [
                      "https://wa.me/923270831470",
                      "https://waseemabbas.online",
                    ],
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
