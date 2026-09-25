"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Building2,
  Sofa,
  Utensils,
  Package,
  Rocket,
  ArrowRight,
  Mouse,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";
import { SmartSalesFunnel } from "@/components/common/smart-sales-funnel";
import { RealEstateRoiCalculator } from "@/components/common/real-estate-roi-calculator";
import { HomeFaqs } from "@/components/common/home-faqs";
import { SocialIcons } from "@/components/common/social-icons";
import { useTranslation } from "@/lib/i18n/context";

export default function HomePage() {
  const { t, language, isRTL } = useTranslation();

  // Subheading typewriter texts for each language
  const typewriterByLang = {
    en: "Real Estate Performance Agency · High-ROAS Paid Ads · Verified PropTech · Chinioti Craft",
    ur: "رئیل اسٹیٹ پرفارمنس ایجنسی · میٹا اشتہارات · تصدیق شدہ پراپرٹی · چنیوٹی فرنیچر",
    roman: "Real Estate Performance Agency · High-ROAS Paid Ads · Verified PropTech · Chinioti Craft",
  };

  const fullText = typewriterByLang[language] || typewriterByLang.en;
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [fullText]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Localized sector content
  const sectorsContent = {
    en: {
      gatewayTag: "Zero-Confusion Navigation · 3 Dedicated Portals",
      gatewayTitle: "Which Sector Would You Like to Explore Today?",
      gatewayDesc: "Direct access to dedicated platforms built with maximum transparency and speed:",
      realEstatePortal: "WATECH Real Estate",
      realEstateDesc: "100% verified luxury bungalows, investment plots, commercial plazas and flexible installment schemes in Punjab.",
      realEstatePoints: [
        "Registry & Land Ownership 100% Verified",
        "Plot & Construction Cost Calculator",
        "Direct Owner & Verified Agent Contact",
      ],
      realEstateBtn: "Explore Real Estate Portal",
      furniturePortal: "Chiniot Royal Furniture",
      furnitureDesc: "Authentic Chinioti solid Sheesham wood bridal bedroom sets, hand-carved sofas, dining tables and custom orders.",
      furniturePoints: [
        "100% Seasoned Solid Sheesham Wood",
        "Custom Furniture Order Builder Tool",
        "Direct Factory Pricing (Zero Middlemen)",
      ],
      furnitureBtn: "Explore Furniture Showroom",
      agencyPortal: "WATECH AI & Digital Agency",
      agencyDesc: "High-converting Meta Ads, TikTok campaigns, Next.js web platforms and 24/7 automated WhatsApp AI sales systems.",
      agencyPoints: [
        "3.8x+ Average Verified Client ROAS",
        "Live Ad Spend & Profit Margin Calculator",
        "Free 15-Minute Strategy Consultation",
      ],
      agencyBtn: "Explore Agency Services",
      enterpriseTitle: "Enterprise Business Growth & Tech Solutions",
      enterpriseDesc: "High-ROI omnichannel performance marketing, automated WhatsApp CRM systems, and bespoke software built for Pakistani founders.",
      servicesPillars: [
        {
          tag: "Meta & Google Ads",
          title: "Omnichannel Paid Ads",
          desc: "Targeted customer acquisition campaigns across Meta and Google for high-ticket verified buyers.",
        },
        {
          tag: "0s Lead Latency",
          title: "Automated WhatsApp CRM",
          desc: "Instant zero-second inquiry responses, lead qualification and automated broadcast pipelines.",
        },
        {
          tag: "Next.js 16 Speed",
          title: "Custom Web Platforms",
          desc: "Lightning fast Next.js web platforms with local payment integrations, WhatsApp checkout and live analytics.",
        },
        {
          tag: "Developer Tech",
          title: "Real Estate & Society Tech",
          desc: "Specialized inventory management, on-ground sales force tracking and automated dealer commission engines.",
        },
      ],
      auditHeading: "Claim Your Free 15-Minute Real Estate Growth Audit",
      auditDesc: "We audit your property digital marketing, ad spend ROI and sales pipeline to share a practical scaling blueprint.",
      auditBtn: "Claim Free Audit",
      fiveSectorsTag: "Integrated Capabilities",
      fiveSectorsTitle: "Core Sectors Powered By WATECH Across Pakistan",
      fmcgTitle: "Real Estate Developer & Society Growth Strategy",
      fmcgDesc: "17+ years of commercial leadership — Housing society project launches, investor roadshows, on-ground sales force deployment and dealer commission engines.",
      cateringTitle: "Food, Pakwan & Event Catering",
      cateringDesc: "Verified Shahi Pakwan centers, fresh daig delivery, live BBQ catering, banquet hall reservations and corporate event hospitality.",
      founderHeading: "“Personal Accountability on Every Deal & Digital Partnership.”",
      founderDesc1: "Welcome to WATECH Solutions. In an era where online commerce is often faceless and transactional, we built WATECH to bring personal trust and tangible results back to Pakistan's largest economic sectors.",
      founderDesc2: "Whether you are investing in a verified residential plot in DHA Lahore, commissioning hand-carved pure Sheesham furniture from our master artisans in Chiniot, or hiring our digital agency to scale your real estate development — you deal with an organization built on authenticity and precision.",
      founderDirectBtn: "Direct WhatsApp with Founder",
      founderStoryBtn: "Read Full Vision & Story",
    },
    ur: {
      gatewayTag: "آسان ترین رہنمائی · 3 خصوصی پورٹلز",
      gatewayTitle: "آج آپ کس شعبے میں داخل ہونا چاہتے ہیں؟",
      gatewayDesc: "مکمل شفافیت اور تیز ترین سروس کے ساتھ تیار کردہ ہمارے پورٹلز ملاحظہ فرمائیں:",
      realEstatePortal: "واٹیک رئیل اسٹیٹ",
      realEstateDesc: "پنجاب اور چنیوٹ کے 100% تصدیق شدہ لگژری گھر، انویسٹمنٹ پلاٹس، کمرشل پلازے اور آسان اقساط کے منصوبے۔",
      realEstatePoints: [
        "رجسٹری و انتقال کی 100% قانونی جانچ",
        "رقبہ اور تعمیراتی لاگت کا فوری حساب",
        "مالک مکان اور مجاز ایجنٹ سے براہِ راست رابطہ",
      ],
      realEstateBtn: "رئیل اسٹیٹ پورٹل دیکھیں",
      furniturePortal: "چنیوٹ رائل فرنیچر",
      furnitureDesc: "خالص چنیوٹی شیشم لکڑی کے برائیڈل بیڈ سیٹس، ہاتھ سے کندہ صوفے، ڈائننگ ٹیبلز اور حسبِ منشا فرنیچر۔",
      furniturePoints: [
        "100% سیزنڈ خالص شیشم لکڑی کی گارنٹی",
        "اپنی مرضی کا فرنیچر آرڈر ڈیزائن ٹول",
        "براہِ راست فیکٹری ریٹ (بغیر کسی مڈل مین)",
      ],
      furnitureBtn: "فرنیچر شوروم ملاحظہ کریں",
      agencyPortal: "واٹیک ڈیجیٹل ایجنسی",
      agencyDesc: "پاکستانی کاروباری اداروں کے لیے میٹا اشتہارات، جدید ویب پلیٹ فارمز اور 24 گھنٹے خودکار واٹس ایپ اے آئی سسٹمز۔",
      agencyPoints: [
        "3.8 گنا سے زیادہ مصدقہ ایڈز منافع (ROAS)",
        "اشتہاری خرچ اور خالص منافع کیلکولیٹر",
        "مفت 15 منٹ کاروباری گروتھ مشاورت",
      ],
      agencyBtn: "ڈیجیٹل سروسز ملاحظہ کریں",
      enterpriseTitle: "کاروباری ترقی اور جدید ٹیکنالوجی سسٹمز",
      enterpriseDesc: "زیادہ منافع بخش مارکیٹنگ، خودکار واٹس ایپ سی آر ایم، اور تیز رفتار ویب سائٹس جو وزٹرز کو گاہکوں میں تبدیل کریں۔",
      servicesPillars: [
        {
          tag: "میٹا اور گوگل ایڈز",
          title: "پرفارمنس مارکیٹنگ",
          desc: "فیس بک، انسٹاگرام اور گوگل پر ٹارگٹڈ اشتہارات جن سے معیاری خریدار اور لیڈز حاصل ہوں۔",
        },
        {
          tag: "فوری جواب",
          title: "خودکار واٹس ایپ سی آر ایم",
          desc: "انکوائری پر صفر سیکنڈ میں فوری جواب، کسٹمر فلٹریشن اور خودکار سیلز میسجنگ۔",
        },
        {
          tag: "Next.js 16 اسپیڈ",
          title: "جدید ویب پلیٹ فارمز",
          desc: "انتہائی تیز رفتار ویب سائٹس جن میں لوکل پیمنٹ سسٹم اور واٹس ایپ آرڈرنگ شامل ہو۔",
        },
        {
          tag: "انٹرپرائز سافٹ ویئر",
          title: "رئیل اسٹیٹ ڈویلپر سافٹ ویئر",
          desc: "انوینٹری کنٹرول، فیلڈ سیلز فورس ٹریکنگ اور ڈیلر کمیشن مینجمنٹ سسٹمز۔",
        },
      ],
      auditHeading: "اپنے رئیل اسٹیٹ کاروبار کے لیے 15 منٹ کا مفت واٹس ایپ آڈٹ حاصل کریں",
      auditDesc: "ہم آپ کی ڈیجیٹل مارکیٹنگ اور پراپرٹی سیلز طریقہ کار کا جائزہ لے کر ایک جامع گروتھ پلان دیں گے۔",
      auditBtn: "مفت آڈٹ حاصل کریں",
      fiveSectorsTag: "جامع خدمات",
      fiveSectorsTitle: "پاکستان کے اہم شعبے جنہیں ہم بااختیار بناتے ہیں",
      fmcgTitle: "رئیل اسٹیٹ ڈویلپر و ہاؤسنگ سوسائٹی گروتھ اسٹریٹجی",
      fmcgDesc: "17+ سالہ تجارتی قیادت — ہاؤسنگ سوسائٹیز کی لانچنگ، انویسٹر روڈ شوز، سیلز فورس کی تعیناتی اور ڈیلر کمیشن سسٹمز۔",
      cateringTitle: "کھانا، دیگ اور کیٹرنگ سروسز",
      cateringDesc: "تصدیق شدہ شاہی پکوان سینٹرز، تازہ دیگ ڈلیوری، لائیو باربی کیو کیٹرنگ اور بینکوئٹ ہال بکنگ کے انتظامات۔",
      founderHeading: "“ہر کاروباری ڈیل اور پارٹنرشپ پر ذاتی ذمہ داری اور دیانت داری۔”",
      founderDesc1: "واٹیک سلوشنز میں خوش آمدید۔ آن لائن دنیا میں شفافیت کی کمی کو دور کرنے کے لیے ہم نے ایک ایسا پلیٹ فارم بنایا ہے جو پاکستان کے روایتی اور جدید شعبوں کو اعتماد سے جوڑتا ہے۔",
      founderDesc2: "چاہے آپ لاہور میں تصدیق شدہ پلاٹ خرید رہے ہوں، چنیوٹ سے خالص شیشم فرنیچر بنوا رہے ہوں، یا اپنے رئیل اسٹیٹ پراجیکٹ کی سیلز بڑھانے کے لیے ہماری ایجنسی کی خدمات لے رہے ہوں — آپ کو ہمیشہ معیاری اور مخلصانہ رہنمائی ملے گی۔",
      founderDirectBtn: "بانی سے براہِ راست واٹس ایپ رابطہ",
      founderStoryBtn: "ہمارا مکمل ویژن اور سفر پڑھیں",
    },
    roman: {
      gatewayTag: "Zero-Confusion Navigation · 3 Dedicated Portals",
      gatewayTitle: "Aap Aaj Kis Sector Mein Dakhil Hona Chahte Hain?",
      gatewayDesc: "Mukammal shafafiyat aur asani ke sath hamare specialized portals explore karein:",
      realEstatePortal: "WATECH Real Estate",
      realEstateDesc: "Punjab aur Chiniot ke 100% verified luxury bungalows, investment plots, commercial plazas aur asan iqsaat ke projects.",
      realEstatePoints: [
        "Registry Aur Inteqal 100% Verified",
        "Plot Aur Tameerati Kharch Calculator",
        "Direct Owner Aur Verified Agent Se Rabta",
      ],
      realEstateBtn: "Real Estate Portal Dekhein",
      furniturePortal: "Chiniot Royal Furniture",
      furnitureDesc: "Asal Chinioti Sheesham lakri ke bridal bedroom sets, hand-carved sofas, dining tables aur customized orders.",
      furniturePoints: [
        "100% Seasoned Pure Sheesham Wood",
        "Custom Furniture Order Builder Tool",
        "Direct Factory Pricing (Bina Kisi Agent Ke)",
      ],
      furnitureBtn: "Furniture Showroom Dekhein",
      agencyPortal: "WATECH AI & Digital Agency",
      agencyDesc: "Pakistani businesses ke liye high-converting Meta Ads, Next.js web platforms aur 24/7 automated WhatsApp AI systems.",
      agencyPoints: [
        "3.8x+ Average Verified Client ROAS",
        "Live Ad Spend Aur Munafa Calculator",
        "Muft 15-Minute Karobari Audit",
      ],
      agencyBtn: "Digital Agency Services Dekhein",
      enterpriseTitle: "Enterprise Business Growth & Tech Solutions",
      enterpriseDesc: "Pakistani businesses ke liye high-ROI Omnichannel Performance Marketing, Automated WhatsApp CRM Systems, aur Tez tareen Web Portals.",
      servicesPillars: [
        {
          tag: "Meta & Google Ads",
          title: "Omnichannel Paid Ads",
          desc: "Meta aur Google Ads ke zariye high-ticket verified buyers ko target karne wali campaigns.",
        },
        {
          tag: "0s Lead Latency",
          title: "Automated WhatsApp CRM",
          desc: "Inquiry par foran zero-second response, customer verification aur automated lead follow-ups.",
        },
        {
          tag: "Next.js 16 Speed",
          title: "Custom Web Platforms",
          desc: "Tez tareen Next.js 16 web portals with local payment options, WhatsApp checkout aur analytics.",
        },
        {
          tag: "Enterprise Systems",
          title: "Real Estate & Society Tech",
          desc: "Specialized inventory management, sales force route tracking aur dealer commission engines.",
        },
      ],
      auditHeading: "Apne Real Estate Karobar Ke Liye Free 15-Minute WhatsApp Growth Audit Hasil Karein",
      auditDesc: "Hum aapke digital marketing aur current property sales pipeline ka audit karke practical scaling blueprint share karenge.",
      auditBtn: "Claim Free Audit",
      fiveSectorsTag: "Bunyadi Salahiyatein",
      fiveSectorsTitle: "Pakistan Ke Ahem Sectors Jinhein Hum Power Karte Hain",
      fmcgTitle: "Real Estate Developer & Housing Society Growth Strategy",
      fmcgDesc: "17+ saala commercial tajurba — Housing society project launches, investor roadshows, sales force deployment aur dealer commission systems.",
      cateringTitle: "Food, Pakwan & Daig Catering",
      cateringDesc: "Verified Shahi Pakwan centers, taaza daig delivery, live BBQ catering, banquet halls aur corporate events management.",
      founderHeading: "“Har Karobari Deal Aur Partnership Par Zaati Zimadari.”",
      founderDesc1: "WATECH Solutions par khushamdeed. Online karobar mein aitemad aur shafafiyat qayam karne ke liye humne WATECH ki bunyad rakhi.",
      founderDesc2: "Chahe aap Lahore mein verified plot khareed rahe hon, Chiniot se lakri ka furniture banwa rahe hon, ya apne real estate project ki sales barhane ke liye digital agency se rabta kar rahe hon — aapko mukammal asalat aur qabil-e-aitemad nataij milenge.",
      founderDirectBtn: "Founder Se Direct WhatsApp Rabta",
      founderStoryBtn: "Mukammal Vision Aur Story Parhein",
    },
  }[language] || sectorsContent.en;

  return (
    <div className="w-full bg-white selection:bg-slate-900 selection:text-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative min-h-[calc(100vh-5rem)] py-14 flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Subtle Animated Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 50% 40%, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 70%)",
              "radial-gradient(circle at 60% 50%, rgba(241, 245, 249, 1) 0%, rgba(255, 255, 255, 1) 75%)",
              "radial-gradient(circle at 40% 60%, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 70%)",
              "radial-gradient(circle at 50% 40%, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 70%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 -z-10"
        />

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Subheading Typewriter */}
          <div className="mb-5 flex items-center justify-center min-h-[1.75rem]">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-blue-600 font-mono">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-3.5 bg-blue-500 ml-1 translate-y-0.5"
              />
            </span>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] font-black text-slate-900 tracking-tight leading-[1.12] max-w-4xl"
          >
            {t.hero.titlePart1}
            <br />
            <span className="text-blue-600">{t.hero.titlePart2}</span>
            <br />
            {t.hero.titlePart3}
          </motion.h1>

          <p className="text-base sm:text-lg text-slate-600 mt-5 max-w-2xl leading-relaxed">
            {t.hero.description}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#agency-calculator"
              className="px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>{language === "ur" ? "مفت مارکیٹنگ و لیڈز آڈٹ" : language === "roman" ? "Free Real Estate Marketing Audit" : "Claim Free Real Estate Audit"}</span>
            </a>
            <Link
              href="/real-estate"
              className="px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>{language === "ur" ? "رئیل اسٹیٹ مکمل پورٹل" : language === "roman" ? "Real Estate Flagship Portal" : "Real Estate Flagship Portal"}</span>
            </Link>
          </div>

          {/* Quick Ecosystem Pills */}
          <div className="flex items-center justify-center gap-3 mt-4 text-xs font-semibold text-slate-500">
            <span>{language === "ur" ? "خصوصی پورٹلز:" : language === "roman" ? "Connected Portals:" : "Connected Portals:"}</span>
            <Link href="/furniture" className="text-amber-700 hover:text-amber-900 transition-colors">
              🪵 Chinioti Furniture
            </Link>
            <span>•</span>
            <Link href="/events" className="text-purple-700 hover:text-purple-900 transition-colors">
              🎪 Events & Banquets
            </Link>
          </div>

          {/* Authority Metrics Numbers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 w-full max-w-3xl pt-6 border-t border-slate-200/80">
            {[
              { num: t.stats.realEstateExp, label: t.stats.realEstateExpLabel },
              { num: "3.8x+", label: language === "ur" ? "مصدقہ ایڈز منافع (ROAS)" : "Verified Meta Ads ROAS" },
              { num: t.stats.propertiesCount, label: t.stats.propertiesCountLabel },
              { num: "< 30s", label: language === "ur" ? "خودکار واٹس ایپ رسپانس" : "WhatsApp AI Response" },
            ].map((m, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/70 border border-slate-100 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-[#2563EB] tracking-tight font-mono">
                  {m.num}
                </span>
                <span className="text-xs font-semibold text-slate-700 mt-1 leading-snug">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tech & Ad Network Trust Ribbon */}
          <div className="mt-8 pt-4 border-t border-slate-200/60 w-full max-w-3xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
              POWERED BY ENTERPRISE AD NETWORKS & TECH INFRASTRUCTURE
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Meta Business Partner</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Google Ads Certified</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> TikTok Ads Partner</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-600" /> Next.js 16 Turbo</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-purple-600" /> n8n Autonomous AI</span>
            </div>
          </div>

          {/* Founder Authority Pill */}
          <Link
            href="/about"
            className="inline-flex items-center gap-3.5 mt-8 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-700/80 shadow-md group hover:scale-[1.02]"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-400 shrink-0">
              <Image
                src="/images/founder-waseem-abbas.jpg"
                alt="Waseem Abbas - Founder & CEO"
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">{t.founder.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-semibold">
                  {t.founder.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[280px] sm:max-w-md">
                {t.founder.quote}
              </p>
            </div>
            <ArrowRight className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-all ${isRTL ? "rotate-180" : "group-hover:translate-x-1"}`} />
          </Link>
        </div>

        {/* Blinking Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 flex flex-col items-center gap-2 text-slate-400 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
          }}
        >
          <Mouse className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll Down</span>
        </motion.div>
      </section>

      {/* =========================================
          3 DEDICATED PORTALS NAVIGATOR
          ========================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{sectorsContent.gatewayTag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {sectorsContent.gatewayTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {sectorsContent.gatewayDesc}
            </p>
          </div>

          {/* 3 Gateway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Real Estate Portal */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-7 border border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-950/50 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    {t.pillars.realEstateTag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {sectorsContent.realEstatePortal}
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {sectorsContent.realEstateDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {sectorsContent.realEstatePoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/real-estate"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>{sectorsContent.realEstateBtn}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180" : "group-hover/btn:translate-x-1"}`} />
              </Link>
            </div>

            {/* 2. Furniture Portal */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-7 border border-amber-500/30 hover:border-amber-500 transition-all hover:shadow-2xl hover:shadow-amber-950/50 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Sofa className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    {t.pillars.furnitureTag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {sectorsContent.furniturePortal}
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {sectorsContent.furnitureDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {sectorsContent.furniturePoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/furniture"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>{sectorsContent.furnitureBtn}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180" : "group-hover/btn:translate-x-1"}`} />
              </Link>
            </div>

            {/* 3. Agency Portal */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-7 border border-blue-500/30 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-950/50 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    {t.agency.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {sectorsContent.agencyPortal}
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {sectorsContent.agencyDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {sectorsContent.agencyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/agency"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>{sectorsContent.agencyBtn}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180" : "group-hover/btn:translate-x-1"}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          REAL ESTATE MARKETING & LEAD ROI CALCULATOR
          ========================================= */}
      <RealEstateRoiCalculator />

      {/* =========================================
          SMART INTERACTIVE SALES FUNNEL
          ========================================= */}
      <SmartSalesFunnel />

      {/* =========================================
          DIGITAL AGENCY SERVICES SECTION
          ========================================= */}
      <section className="w-full py-20 px-6 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Rocket className="w-3.5 h-3.5" />
                <span>{t.agency.tag}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {sectorsContent.enterpriseTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
                {sectorsContent.enterpriseDesc}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all group"
              >
                <span>{t.common.exploreMore}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180" : "group-hover:translate-x-1"}`} />
              </Link>
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectorsContent.servicesPillars.map((srv, idx) => {
              const icons = [Zap, MessageCircle, TrendingUp, ShieldCheck];
              const SrvIcon = icons[idx] || Zap;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <SrvIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      {srv.tag}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-2">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 group-hover:text-blue-400 font-semibold">
                    <span>{t.common.learnMore}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isRTL ? "rotate-180" : "group-hover:translate-x-1"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Growth Audit Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/50 via-slate-900 to-indigo-950/60 border border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                {t.agency.tag}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                {sectorsContent.auditHeading}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {sectorsContent.auditDesc}
              </p>
            </div>
            <a
              href="https://wa.me/923270831470"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{sectorsContent.auditBtn}</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================
          FIVE SECTORS OVERVIEW
          ========================================= */}
      <section className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {sectorsContent.fiveSectorsTag}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mt-2">
              {sectorsContent.fiveSectorsTitle}
            </h2>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full flex flex-col"
        >
          {/* STRIP 1: REAL ESTATE */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 border-b border-slate-100 bg-gradient-to-r from-blue-50/40 via-white to-white transition-all hover:bg-blue-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] shadow-sm shrink-0">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    {t.pillars.realEstateTag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    {t.pillars.realEstateTitle}
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    {t.pillars.realEstateDesc}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/marketplace?tab=properties"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-semibold text-sm shadow-md hover:shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>{t.pillars.realEstateCta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* STRIP 2: FURNITURE */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 border-b border-slate-100 bg-gradient-to-r from-emerald-50/40 via-white to-white transition-all hover:bg-emerald-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#16A34A]/10 text-[#16A34A] shadow-sm shrink-0">
                  <Sofa className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                    {t.pillars.furnitureTag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    {t.pillars.furnitureTitle}
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    {t.pillars.furnitureDesc}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/marketplace?tab=furniture"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#16A34A] text-white font-semibold text-sm shadow-md hover:shadow-emerald-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>{t.pillars.furnitureCta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* STRIP 3: REAL ESTATE DEVELOPERS & HOUSING SOCIETIES */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-white transition-all hover:bg-blue-50/70"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 shadow-sm shrink-0">
                  <Rocket className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {t.founder.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black uppercase font-mono">
                      {t.stats.realEstateExp}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    {sectorsContent.fmcgTitle}
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    {sectorsContent.fmcgDesc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH,%20I%20am%20a%20Real%20Estate%20Developer%20interested%20in%20project%20marketing%20and%20sales%20growth."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.founder.connectCta}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* STRIP 4: FOOD & CATERING */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 bg-gradient-to-r from-orange-50/40 via-white to-white transition-all hover:bg-orange-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] shadow-sm shrink-0">
                  <Utensils className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    {t.pillars.cateringTag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    {t.pillars.cateringTitle}
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    {t.pillars.cateringDesc}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/marketplace?tab=food-catering"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EA580C] text-white font-semibold text-sm shadow-md hover:shadow-orange-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>{t.pillars.cateringCta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================
          FOUNDER & CEO LEADERSHIP SHOWCASE
          ========================================= */}
      <section className="w-full py-24 px-6 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Founder Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#0066FF] via-cyan-400 to-[#16A34A] rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl">
                  <Image
                    src="/images/founder-waseem-abbas.jpg"
                    alt="Waseem Abbas - Founder & CEO"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-5 text-center">
                    <h4 className="text-xl font-black text-white tracking-tight">{t.founder.name}</h4>
                    <p className="text-xs text-blue-400 font-mono tracking-wider uppercase mt-0.5">
                      {t.founder.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Vision & Credentials */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.founder.tag}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {sectorsContent.founderHeading}
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {sectorsContent.founderDesc1}
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {sectorsContent.founderDesc2}
              </p>

              {/* 3 Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.hero.verifiedBadge}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-black text-[#0066FF]">{t.stats.realEstateExp}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.stats.realEstateExpLabel}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-emerald-400">&lt; 30s</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.nav.whatsapp}</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="https://wa.me/923270831470"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#0066FF] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all shadow-xl shadow-blue-600/30 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{sectorsContent.founderDirectBtn}</span>
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-all border border-slate-700 hover:scale-105"
                >
                  <span>{sectorsContent.founderStoryBtn}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SOCIAL MEDIA BANNER
          ========================================= */}
      <section className="w-full py-12 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SocialIcons variant="banner" />
        </div>
      </section>

      {/* =========================================
          FAQS SECTION
          ========================================= */}
      <HomeFaqs />
    </div>
  );
}
