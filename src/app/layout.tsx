import type { Metadata, Viewport } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/common/site-shell";
import { LanguageProvider } from "@/lib/i18n/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.waseemabbas.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WATECH Solutions | Free Business Tools, Agency & Real Estate",
    template: "%s | WATECH Solutions",
  },
  description:
    "Access 100+ free business tools, scale with Meta/TikTok ads, buy verified plots, and order authentic Chinioti furniture. Pakistan's trusted growth platform.",
  keywords: [
    "Watech Solutions",
    "Free business calculators Pakistan",
    "Digital marketing agency Pakistan",
    "Real Estate Pakistan",
    "Plots for sale Lahore Islamabad",
    "Chinioti Furniture factory price",
    "Meta Ads Agency Lahore",
    "Waseem Abbas Watech",
  ],
  authors: [{ name: "Watech Solutions", url: siteUrl }],
  creator: "Watech Solutions",
  publisher: "Watech Solutions",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: `${siteUrl}/?lang=en`,
      ur: `${siteUrl}/?lang=ur`,
      "ur-Latn": `${siteUrl}/?lang=roman`,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: "WATECH Solutions | Free Business Tools, Agency & Real Estate",
    description:
      "Access 100+ free business tools, scale with Meta/TikTok ads, buy verified plots, and order authentic Chinioti furniture. Pakistan's trusted growth platform.",
    url: siteUrl,
    siteName: "WATECH Solutions Platform",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/watech-official-logo.png`,
        width: 1200,
        height: 630,
        alt: "WATECH Solutions Multi-Sector Growth Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WATECH Solutions | Free Business Tools, Agency & Real Estate",
    description:
      "Access 100+ free business tools, scale with Meta/TikTok ads, buy verified plots, and order authentic Chinioti furniture.",
    images: [`${siteUrl}/images/watech-official-logo.png`],
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
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
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
    <html lang="en" className={`${inter.variable} ${notoUrdu.variable}`} suppressHydrationWarning>
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
                    url: `${siteUrl}/images/watech-official-logo.png`,
                  },
                  image: `${siteUrl}/images/watech-official-logo.png`,
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
                    "https://www.facebook.com/share/1EqXm2Hz43/",
                    "https://www.instagram.com/waseem79199?stkn=MWVtMmZhc3BjN3Vucg==",
                    "https://www.tiktok.com/@waseem97199",
                    "https://x.com/WaseemAbba34198",
                    "https://www.linkedin.com/in/waseem-abbas-441496163?utm_source=share_via&utm_content=profile&utm_medium=member_android",
                    "https://youtube.com/@wamedia79979?si=C6-sgoMhrPIsY8da",
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
                      "https://www.facebook.com/share/1EqXm2Hz43/",
                      "https://www.instagram.com/waseem79199?stkn=MWVtMmZhc3BjN3Vucg==",
                      "https://www.tiktok.com/@waseem97199",
                      "https://x.com/WaseemAbba34198",
                      "https://www.linkedin.com/in/waseem-abbas-441496163?utm_source=share_via&utm_content=profile&utm_medium=member_android",
                      "https://youtube.com/@wamedia79979?si=C6-sgoMhrPIsY8da",
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
                  alternateName: "Watech Solutions Ecosystem",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                  inLanguage: ["en-PK", "ur-PK"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${siteUrl}/tools?search={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "FAQPage",
                  "@id": `${siteUrl}/#faq`,
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is WATECH Solutions Platform?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Watech Solutions is Pakistan's integrated growth ecosystem combining performance digital marketing, verified real estate deals, authentic factory-direct Chinioti woodcraft, and over 100 free online business calculators.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do you guarantee authentic Chinioti wood furniture?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "All our furniture items are hand-carved by master artisans in Chiniot using 100% seasoned, authentic solid Sheesham wood with lifetime durability against termite and structural decay.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Are the real estate listings legally verified?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. Every plot, house, and commercial property listed on our marketplace undergoes rigorous title deed, registry, and ownership verification before being displayed.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Are the 100+ business calculators really free?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, completely free forever with no sign-up or paywalls. You can calculate property installments, ad spend ROI, wood estimates, and business taxes anytime.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How can businesses hire WATECH digital marketing agency?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Businesses can book a consultation on our website or contact us directly on WhatsApp at +923270831470 for performance Meta/TikTok ads, software engineering, and CRM automation.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-slate-900 selection:text-white pb-14 md:pb-0">
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>

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
