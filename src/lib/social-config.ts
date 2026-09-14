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
    url: "https://www.facebook.com/share/1EqXm2Hz43/",
    label: "Follow Waseem on Facebook",
    enabled: true,
  },
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/waseem79199?stkn=MWVtMmZhc3BjN3Vucg==",
    label: "Follow Waseem on Instagram",
    enabled: true,
  },
  tiktok: {
    name: "TikTok",
    url: "https://www.tiktok.com/@waseem97199",
    label: "Follow Waseem on TikTok",
    enabled: true,
  },
  twitter: {
    name: "Twitter (X)",
    url: "https://x.com/WaseemAbba34198",
    label: "Follow Waseem on X",
    enabled: true,
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/waseem-abbas-441496163?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "Connect with Waseem Abbas on LinkedIn",
    enabled: true,
  },
  youtube: {
    name: "YouTube",
    url: "https://youtube.com/@wamedia79979?si=C6-sgoMhrPIsY8da",
    label: "Subscribe to WA Media on YouTube",
    enabled: true,
  },
};