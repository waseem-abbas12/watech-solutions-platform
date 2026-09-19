export type SupportedLanguage = "en" | "ur" | "roman";

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
  locale: string;
  hreflang: string;
}

export interface NavigationTranslations {
  home: string;
  realEstate: string;
  furniture: string;
  agency: string;
  tools: string;
  tracker: string;
  about: string;
  blog: string;
  partners: string;
  marketplace: string;
  downloadApp: string;
  contactUs: string;
  getStarted: string;
  callNow: string;
  whatsapp: string;
  switchLanguage: string;
}

export interface HeroTranslations {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  exploreToolsCta: string;
  verifiedBadge: string;
  experienceBadge: string;
}

export interface StatsTranslations {
  fmcgExp: string;
  fmcgExpLabel: string;
  toolsCount: string;
  toolsCountLabel: string;
  propertiesCount: string;
  propertiesCountLabel: string;
  furnitureCount: string;
  furnitureCountLabel: string;
}

export interface PillarTranslations {
  realEstateTag: string;
  realEstateTitle: string;
  realEstateDesc: string;
  realEstateCta: string;
  furnitureTag: string;
  furnitureTitle: string;
  furnitureDesc: string;
  furnitureCta: string;
  cateringTag: string;
  cateringTitle: string;
  cateringDesc: string;
  cateringCta: string;
}

export interface AgencyTranslations {
  tag: string;
  title: string;
  description: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  ctaButton: string;
}

export interface ToolsTeaserTranslations {
  tag: string;
  title: string;
  description: string;
  searchPlaceholder: string;
  viewAllTools: string;
  featuredTools: Array<{
    title: string;
    description: string;
    category: string;
  }>;
}

export interface FounderTranslations {
  tag: string;
  name: string;
  title: string;
  quote: string;
  bio: string;
  fmcgHighlight: string;
  connectCta: string;
}

export interface FunnelTranslations {
  tag: string;
  title: string;
  subtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  options: {
    realEstate: string;
    furniture: string;
    agency: string;
    tools: string;
    other: string;
  };
  namePlaceholder: string;
  phonePlaceholder: string;
  cityPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  successTitle: string;
  successDesc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqsTranslations {
  tag: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface FooterTranslations {
  brandDesc: string;
  quickLinks: string;
  ecosystem: string;
  toolsAndServices: string;
  contactInfo: string;
  rightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  address: string;
  phone: string;
  email: string;
  selectLanguage: string;
}

export interface CommonTranslations {
  learnMore: string;
  viewDetails: string;
  exploreMore: string;
  bookNow: string;
  orderNow: string;
  freeBadge: string;
  verifiedBadge: string;
  loading: string;
  close: string;
  back: string;
}

export interface Dictionary {
  nav: NavigationTranslations;
  hero: HeroTranslations;
  stats: StatsTranslations;
  pillars: PillarTranslations;
  agency: AgencyTranslations;
  toolsTeaser: ToolsTeaserTranslations;
  founder: FounderTranslations;
  funnel: FunnelTranslations;
  faqs: FaqsTranslations;
  footer: FooterTranslations;
  common: CommonTranslations;
}
