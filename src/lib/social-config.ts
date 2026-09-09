export interface SocialLinkItem {
  platform: string;
  url: string;
  label: string;
  isEnabled: boolean;
}

export const WATECH_CONTACT_CONFIG = {
  brandName: "WATECH Solutions",
  legalName: "Watech Solutions Platform",
  tagline: "Pakistan's Integrated Multi-Sector Business & Growth Ecosystem",
  email: "waseem000094@gmail.com",
  phone: "+92 327 0831470",
  whatsappNumber: "923270831470",
  whatsappDisplay: "0327-0831470",
  portfolioUrl: "https://waseemabbas.online",
  locations: ["Lahore", "Faisalabad", "Islamabad", "Pakistan"],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.waseemabbas.online",
};

export const SOCIAL_LINKS = {
  whatsapp: {
    name: "WhatsApp",
    url: "https://wa.me/923270831470",
    label: "Contact Watech on WhatsApp",
    enabled: true,
  },
  facebook: {
    name: "Facebook",
    url: "https://www.facebook.com/watechsolutions",
    label: "Follow Watech on Facebook",
    enabled: false, // Disabled until official verified page is live
  },
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/watechsolutions",
    label: "Follow Watech on Instagram",
    enabled: false,
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/watech-solutions",
    label: "Connect with Watech on LinkedIn",
    enabled: false,
  },
  youtube: {
    name: "YouTube",
    url: "https://www.youtube.com/@watechsolutions",
    label: "Subscribe to Watech on YouTube",
    enabled: false,
  },
  tiktok: {
    name: "TikTok",
    url: "https://www.tiktok.com/@watechsolutions",
    label: "Follow Watech on TikTok",
    enabled: false,
  },
};