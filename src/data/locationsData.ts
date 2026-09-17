export interface CityPricingPackage {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

export interface CityCaseStudy {
  clientType: string;
  area: string;
  resultHeadline: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface CityFAQ {
  question: string;
  answer: string;
}

export interface CityLocationDetail {
  slug: string;
  cityName: string;
  province: string;
  tagline: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  heroHeadline: string;
  heroSubtitle: string;
  geoCoordinates: {
    latitude: string;
    longitude: string;
  };
  keyAreas: string[];
  stats: { label: string; value: string }[];
  marketOverview: string;
  serviceSpecialties: {
    title: string;
    description: string;
    highlight: string;
  }[];
  localMarketChallenges: {
    problem: string;
    solution: string;
  }[];
  caseStudy: CityCaseStudy;
  pricingPackages: CityPricingPackage[];
  faqs: CityFAQ[];
  whatsappMessage: string;
}

export const LOCATIONS_DATA: CityLocationDetail[] = [
  // 1. LAHORE HUB
  {
    slug: "lahore",
    cityName: "Lahore",
    province: "Punjab",
    tagline: "Punjab's Commercial Heart & Performance Digital Agency Hub",
    badge: "Lahore Central Business Hub",
    metaTitle: "Best Digital Marketing Agency in Lahore | Meta Ads & Web Development | WATECH",
    metaDescription:
      "Top-rated digital marketing & performance ads agency in Lahore. Scale your real estate, e-commerce & retail business in DHA, Gulberg, Bahria Town & Johar Town with verified ROAS.",
    targetKeywords: [
      "Digital marketing agency in Lahore",
      "Facebook ads agency Lahore",
      "Social media marketing Lahore",
      "Meta ads expert DHA Lahore",
      "Real estate marketing agency Lahore",
      "Website development company Lahore",
      "SEO services in Lahore Gulberg",
      "Performance marketing agency Pakistan",
    ],
    heroHeadline: "Top Digital Marketing & High-ROAS Ads Agency in Lahore",
    heroSubtitle:
      "Lahore ke businesses ko vanity likes nahi, confirmed phone inquiries aur high-value closed deals chahiye. Hum DHA, Gulberg, Bahria Town, aur Johar Town ke brands ko performance marketing se scale karte hain.",
    geoCoordinates: {
      latitude: "31.5204",
      longitude: "74.3587",
    },
    keyAreas: [
      "DHA Lahore (Phases 1-9)",
      "Gulberg (Main Boulevard & MM Alam)",
      "Bahria Town Lahore",
      "Johar Town & Model Town",
      "Cavalry Ground & Cantt",
      "Wapda Town & Lake City",
    ],
    stats: [
      { label: "Lahore Campaigns Executed", value: "140+" },
      { label: "Average Real Estate ROAS", value: "4.8x" },
      { label: "WhatsApp Leads Generated", value: "85,000+" },
      { label: "Client Retention Rate", value: "94%" },
    ],
    marketOverview:
      "Lahore Pakistan ka sab se zyada competitive digital marketing hub hai. Yahan aam boosting kaam nahi karti kyunki DHA aur Gulberg ke buyers high-quality video content aur verified transparency mangte hain. WATECH Lahore ke business ecosystem ke liye bespoke funnels banata hai.",
    serviceSpecialties: [
      {
        title: "DHA & Bahria Real Estate Lead Generation",
        description:
          "High-intent local aur overseas Pakistani buyers ke liye laser-targeted Meta & Google ad campaigns jo direct WhatsApp par verified leads deliver karti hain.",
        highlight: "Average plot inquiry cost under Rs. 180",
      },
      {
        title: "E-Commerce & Retail Brand Scaling",
        description:
          "Shopify & WooCommerce stores ke liye TikTok & Meta catalog ads with automated abandoned cart recovery aur high-conversion product videos.",
        highlight: "Proven 3.5x to 6x verified ROAS",
      },
      {
        title: "Custom Web Portals & CRM Integration",
        description:
          "Next.js high-speed portals with WhatsApp bot automation taake Lahore ke busy sales agents ko har lead 30 seconds ke andar attend karne ki sahoolat mile.",
        highlight: "Under 1.2s page load speed",
      },
    ],
    localMarketChallenges: [
      {
        problem: "Lahore ki aam agencies monthly retainer le kar fake impressions aur likes dikha deti hain.",
        solution: "Hum vanity metrics ke bajaye daily verified WhatsApp leads aur closed sales numbers par kaam karte hain.",
      },
      {
        problem: "Ad spend zyada lagta hai lekin irrelevant log 'Interested' likh kar chor dete hain.",
        solution: "Hum multi-step qualifying bot lagate hain jo buyer se budget aur location pooch kar sirf serious leads forward karta hai.",
      },
    ],
    caseStudy: {
      clientType: "DHA Phase 7 & 8 Estate Consultant",
      area: "DHA Phase 6, Lahore",
      resultHeadline: "14 Commercial & Residential Plots Closed in 45 Days",
      description:
        "Client pehle aam boost posts par monthly 1.5 Lakh zaya kar raha tha. WATECH ne cinematic site walk-through videos aur precise UK/USA overseas Pakistani targeting framework lagaya, jisse inquiry conversion rate 320% barh gaya.",
      stats: [
        { label: "Total Ad Spend", value: "Rs. 240,000" },
        { label: "Qualified Leads", value: "612" },
        { label: "Deals Closed", value: "14 Units" },
        { label: "Revenue Generated", value: "Rs. 22.8 Crore" },
      ],
    },
    pricingPackages: [
      {
        name: "Lahore Business Starter",
        price: "Rs. 45,000",
        period: "/ month",
        features: [
          "Meta (Facebook & Instagram) Campaign Setup",
          "12 High-Converting Graphics & 4 Reels",
          "WhatsApp Direct Lead Generation",
          "Targeting DHA, Gulberg & Bahria Town",
          "Weekly Analytics & ROAS Report",
        ],
      },
      {
        name: "Performance Scale (Most Popular)",
        price: "Rs. 85,000",
        period: "/ month",
        popular: true,
        features: [
          "Omnichannel (Meta + TikTok + Google Ads)",
          "Overseas Pakistani Buyer Targeting (UK, UAE, US)",
          "Automated WhatsApp Qualification Bot",
          "Bespoke High-Speed Landing Page",
          "Weekly 4K Video Editing & Ad Creatives",
          "Dedicated Account Strategist & Daily Audit",
        ],
      },
      {
        name: "Enterprise Market Leader",
        price: "Rs. 150,000",
        period: "/ month",
        features: [
          "Full-Funnel Growth Architecture",
          "Custom CRM Integration & Lead Pipeline",
          "Multi-City Geo Targeting (Lahore + Islamabad)",
          "Daily Creative Iterations & A/B Testing",
          "CEO Waseem Abbas Direct Strategy Sessions",
          "Dedicated 24/7 Priority Support",
        ],
      },
    ],
    faqs: [
      {
        question: "Kya WATECH Lahore ke clients ke sath on-site meeting karta hai?",
        answer:
          "Jee haan! Hum Gulberg, DHA aur Bahria Town ke commercial clients ke sath in-person consultation aur content shoot planning schedule karte hain.",
      },
      {
        question: "Real estate campaigns ke liye Lahore mein kitna minimum ad budget chahiye hota hai?",
        answer:
          "Hamari recommendation minimum Rs. 2,000 se Rs. 4,000 rozana ka ad spend hota hai taake Meta ka algorithm high-intent plot buyers ko filter kar sake.",
      },
      {
        question: "Lahore ke overseas Pakistani buyers ko kaise target kiya jata hai?",
        answer:
          "Hum UK (London, Birmingham, Manchester), UAE (Dubai, Abu Dhabi), aur USA mein rehnay walay un Pakistaniyon ko target karte hain jinka recent interest Lahore property aur investment mein ho.",
      },
    ],
    whatsappMessage:
      "Assalam-o-Alaikum Watech! Mujhe Lahore mein apne business ki digital marketing aur Meta ads ke hawalay se consult karna hai.",
  },

  // 2. ISLAMABAD & RAWALPINDI HUB
  {
    slug: "islamabad-rawalpindi",
    cityName: "Islamabad & Rawalpindi",
    province: "Federal Capital / Punjab",
    tagline: "Twin Cities High-Ticket Real Estate & Corporate Growth Hub",
    badge: "Twin Cities Capital Hub",
    metaTitle: "Real Estate Digital Marketing Agency Islamabad & Rawalpindi | WATECH",
    metaDescription:
      "Premier real estate marketing agency in Islamabad & Rawalpindi. Scale high-ticket plots, villas & commercial projects in Bahria Town, DHA Islamabad, Gulberg Greens & B-17.",
    targetKeywords: [
      "Real estate marketing agency Islamabad",
      "Digital marketing agency Islamabad",
      "Facebook ads Bahria Town Rawalpindi",
      "DHA Islamabad property marketing",
      "Gulberg Greens Islamabad marketing agency",
      "Real estate lead generation Rawalpindi",
      "Social media agency Islamabad",
      "Corporate SEO services Islamabad",
    ],
    heroHeadline: "High-Ticket Real Estate & Corporate Ads in Islamabad & Rawalpindi",
    heroSubtitle:
      "Islamabad aur Rawalpindi ke real estate projects, builders aur corporate firms ke liye premium performance funnels. Overseas Pakistani aur local investors ko direct WhatsApp sales desk par layein.",
    geoCoordinates: {
      latitude: "33.6844",
      longitude: "73.0479",
    },
    keyAreas: [
      "DHA Islamabad (Phases 1-5)",
      "Bahria Town Rawalpindi (Phases 1-8)",
      "Gulberg Greens & Residencia Islamabad",
      "Blue Area & F-6/F-7/F-8 Commercial Hub",
      "Multi Gardens B-17 & Faisal Town",
      "Chaklala Scheme 3 & Saddar Rawalpindi",
    ],
    stats: [
      { label: "Twin Cities Projects Marketed", value: "65+" },
      { label: "Overseas Buyer Inquiries", value: "42,000+" },
      { label: "Average Investor Ticket Size", value: "Rs. 1.8 Crore" },
      { label: "ROAS on Luxury Villas", value: "5.2x" },
    ],
    marketOverview:
      "Islamabad aur Rawalpindi mein sab se zyada buying power overseas Pakistani diaspora aur government/corporate elites ki hai. Yahan sasti chizen nahi, credibility, NOC status, aur transparent legal registry sell hoti hai. Hamara content trust aur authority establish karta hai.",
    serviceSpecialties: [
      {
        title: "NOC Verified Housing & Commercial Marketing",
        description:
          "RDA/CDA approved societies ke liye complete project launch campaign with 3D master plans, drone video ads aur site walkthroughs.",
        highlight: "Overseas lead qualification flow",
      },
      {
        title: "High-Ticket Investor WhatsApp Funnels",
        description:
          "Investors ko private consultation calendars par book karwane ke liye targeted Meta Ads with automated CRM followup notifications.",
        highlight: "Direct booking rate > 18%",
      },
      {
        title: "Corporate Brand Positioning & Authority",
        description:
          "Islamabad ke tech startups, consulting firms aur construction companies ke liye LinkedIn & Meta executive branding.",
        highlight: "High authority B2B pipeline",
      },
    ],
    localMarketChallenges: [
      {
        problem: "Twin cities mein fake files aur unapproved societies ki wajah se buyers ka aitmaad uth chuka hai.",
        solution: "Hum sirf clean, legally verified USPs ko highlight karte hain aur transparent BOQ/pricing de kar trust build karte hain.",
      },
      {
        problem: "Overseas buyers call pick nahi karte aur timezone difference hota hai.",
        solution: "Hum automated 24/7 WhatsApp AI responder integrate karte hain jo UK/US timezone mein bhi 5 second mein lead ko attend karta hai.",
      },
    ],
    caseStudy: {
      clientType: "Luxury Villa Developer, Gulberg Greens",
      area: "Gulberg Greens, Islamabad",
      resultHeadline: "9 Luxury Farmhouse & Villa Bookings in 60 Days",
      description:
        "Developer ne 5 Crore+ price tag wali luxury properties market karni theen. WATECH ne high-net-worth individual (HNWI) targeting strategy lagayi jisme Gulf aur European Pakistanis ko virtual video tours offer kiye gaye.",
      stats: [
        { label: "Total Ad Spend", value: "Rs. 380,000" },
        { label: "High-Net-Worth Leads", value: "184" },
        { label: "Confirmed Bookings", value: "9 Villas" },
        { label: "Total Deal Volume", value: "Rs. 47 Crore" },
      ],
    },
    pricingPackages: [
      {
        name: "Twin Cities Real Estate Launch",
        price: "Rs. 60,000",
        period: "/ month",
        features: [
          "Meta Ads for Bahria Town & DHA Islamabad",
          "High-Resolution Visual Ads & Drone Video Edits",
          "Direct WhatsApp Lead Form Optimization",
          "Targeting Rawalpindi, Islamabad & Overseas",
          "Weekly Sales Pipeline Review",
        ],
      },
      {
        name: "Corporate Growth & Investor Hub",
        price: "Rs. 110,000",
        period: "/ month",
        popular: true,
        features: [
          "Omnichannel Meta, Google Search & YouTube Ads",
          "Automated 24/7 International Timezone WhatsApp Bot",
          "Interactive Project Landing Page with Map Integration",
          "UK, UAE & Saudi Arabia High-Ticket Targeting",
          "Weekly Lead Audit & Sales Closing Coaching",
          "Dedicated Growth Lead by Watech",
        ],
      },
      {
        name: "Mega Project Exclusive",
        price: "Rs. 220,000",
        period: "/ month",
        features: [
          "Complete Society / Commercial Plaza Takeover",
          "Bespoke Investor Portal & Unit Booking Software",
          "Full Creative Production with Live Site Video Anchoring",
          "Nationwide & Global Diaspora Ad Syndication",
          "Direct Partnership with CEO Waseem Abbas",
        ],
      },
    ],
    faqs: [
      {
        question: "Kya aap Bahria Town Rawalpindi aur DHA Islamabad mein project shoots karte hain?",
        answer:
          "Jee haan! Hamari video production team site par ja kar real footage, drone views, aur agent video reels record karti hai taake authentic visual ad bane.",
      },
      {
        question: "Islamabad ke clients ke liye overseas leads kaise convert hoti hain?",
        answer:
          "Hum direct WhatsApp link provide karte hain jisme property ka scanned registry/NOC document aur price sheet pre-attached hoti hai taake overseas buyer bina shaq ke deal kare.",
      },
    ],
    whatsappMessage:
      "Assalam-o-Alaikum Watech! Mujhe Islamabad / Rawalpindi mein real estate project aur digital marketing scaling ke hawalay se baat karni hai.",
  },

  // 3. FAISALABAD HUB
  {
    slug: "faisalabad",
    cityName: "Faisalabad",
    province: "Punjab",
    tagline: "Pakistan's Industrial & Textile E-Commerce Capital",
    badge: "Faisalabad Industrial Hub",
    metaTitle: "Digital Marketing & E-Commerce Ads Agency Faisalabad | WATECH",
    metaDescription:
      "Scale your textile, retail, e-commerce & wholesale business in Faisalabad. High-ROAS Facebook ads, COD courier funnels & web development in D-Ground, Peoples Colony & Satyana Road.",
    targetKeywords: [
      "Digital marketing agency Faisalabad",
      "Facebook ads agency Faisalabad",
      "Textile marketing agency Faisalabad",
      "E-commerce agency Faisalabad",
      "Website design Faisalabad",
      "D Ground Faisalabad marketing services",
      "COD returns calculator Pakistan",
      "Wholesale business lead generation Faisalabad",
    ],
    heroHeadline: "E-Commerce, Textile & Retail Scaling in Faisalabad",
    heroSubtitle:
      "Faisalabad ke textile manufacturers, wholesalers, aur retailers ke liye high-volume performance marketing. Low ad cost par confirmed cash-on-delivery orders aur B2B export leads generate karein.",
    geoCoordinates: {
      latitude: "31.4504",
      longitude: "73.1350",
    },
    keyAreas: [
      "D-Ground & Peoples Colony 1-2",
      "Kohinoor City & Jaranwala Road",
      "Satyana Road & Susan Road",
      "Clock Tower Bazaars (Anarkali, Katchery, Rail)",
      "Madina Town & Canal Road",
      "Small Industrial Estate & Millat Road",
    ],
    stats: [
      { label: "Faisalabad E-Com Brands Scaled", value: "48+" },
      { label: "Monthly COD Orders Generated", value: "24,000+" },
      { label: "Average Return Rate Reduced To", value: "< 11%" },
      { label: "Textile B2B Inquiries", value: "19,000+" },
    ],
    marketOverview:
      "Faisalabad Pakistan ka manufacturing engine hai. Yahan sab se sasta product banta hai lekin mostly karobar digital marketing na hone ki wajah se aam wholesalers ko saste damon maal baichne par majboor hain. Hum Faisalabad ke manufacturers ko direct customer (D2C) aur nationwide franchise models par laye hain.",
    serviceSpecialties: [
      {
        title: "Textile & Clothing Brand E-Com Scaling",
        description:
          "Stitched, unstitched aur bedsheet manufacturers ke liye Meta & TikTok Dynamic Product Ads jo nationwide parcel deliver karwati hain.",
        highlight: "Average COD confirmation rate 91%",
      },
      {
        title: "B2B Wholesale Buyer Lead Generation",
        description:
          "Karachi, Lahore, Rawalpindi aur Quetta ke retail shopkeepers ko target karke bulk order inquiries Faisalabad factory ke WhatsApp par lana.",
        highlight: "Minimum order quantity (MOQ) optimization",
      },
      {
        title: "Courier COD Return Rate Shield",
        description:
          "Watech ka smart OTP qualification bot jo fake addresses aur time-pass orders ko parcel pack hone se pehle filter out kar deta hai.",
        highlight: "Courier return loss cut by 40%",
      },
    ],
    localMarketChallenges: [
      {
        problem: "Faisalabad ke manufacturers online bechte waqt COD return (RTO) se preshan rehte hain.",
        solution: "Hum WATECH Free COD Courier Return Shield lagate hain jo buyer ke phone number ki validity confirm karta hai.",
      },
      {
        problem: "Local marketing agencies factory owner ka pain point aur fabric quality nahi samajhte.",
        solution: "Hum direct GSM, fabric weave, deco finish aur production capacity ke mutabiq honest creatives banate hain.",
      },
    ],
    caseStudy: {
      clientType: "Unstitched Lawn & Bedsheet Factory, Susan Road",
      area: "Susan Road, Faisalabad",
      resultHeadline: "Monthly 3,400+ Direct Parcel Orders with 4.4x ROAS",
      description:
        "Factory pehle middle-men dealers ko 30-day credit par kapra deti thi jahan payment phans jati thi. WATECH ne direct consumer online brand launch kiya jisse daily cashflow aur advanced bank payments shuru huin.",
      stats: [
        { label: "Monthly Ad Spend", value: "Rs. 420,000" },
        { label: "Orders Delivered", value: "3,412 Parcels" },
        { label: "Monthly Revenue", value: "Rs. 1.85 Crore" },
        { label: "Return Rate", value: "8.6%" },
      ],
    },
    pricingPackages: [
      {
        name: "Faisalabad Factory Starter",
        price: "Rs. 40,000",
        period: "/ month",
        features: [
          "Meta & TikTok Catalog Ad Management",
          "Direct WhatsApp & Website Checkout Funnel",
          "Creative Graphics & Product Showcase Reels",
          "Targeting All Major Pakistan Cities",
          "Weekly Profit & Loss Statement",
        ],
      },
      {
        name: "D2C National Brand Scaler",
        price: "Rs. 75,000",
        period: "/ month",
        popular: true,
        features: [
          "High-ROAS TikTok Ads & Meta Scaling",
          "Automated Address Confirmation WhatsApp Bot",
          "Courier Integration (TCS, Leopards, CallCourier)",
          "Daily Retargeting of Abandoned Website Carts",
          "A/B Testing of Pricing Offers & Free Shipping Bundles",
          "Dedicated Faisalabad E-Commerce Specialist",
        ],
      },
    ],
    faqs: [
      {
        question: "Kya aap Faisalabad ke fabric manufacturers ke warehouse par aakar video shoots karte hain?",
        answer:
          "Jee haan! Hum factory machines, loom process, aur packaging quality ki high-definition visual videos create karte hain jo buyer ka trust jeetti hain.",
      },
      {
        question: "COD courier returns ko Watech kaise kam karta hai?",
        answer:
          "Hum parcel ship hone se pehle WhatsApp par automated confirmation message bhejte hain jisme customer se address verify karwaya jata hai.",
      },
    ],
    whatsappMessage:
      "Assalam-o-Alaikum Watech! Mujhe Faisalabad mein apne textile / e-commerce brand ko scale karne ke hawalay se baat karni hai.",
  },

  // 4. KARACHI HUB
  {
    slug: "karachi",
    cityName: "Karachi",
    province: "Sindh",
    tagline: "Pakistan's Mega Economic Hub & B2B Growth Engine",
    badge: "Karachi Financial Mega-Hub",
    metaTitle: "Digital Marketing & Performance Agency Karachi | WATECH",
    metaDescription:
      "Top-tier performance marketing agency in Karachi. Scale high-volume sales funnels, corporate B2B lead generation & custom web apps in Clifton, DHA Karachi & Shahrah-e-Faisal.",
    targetKeywords: [
      "Digital marketing agency in Karachi",
      "Social media marketing Karachi",
      "Performance marketing agency Karachi",
      "B2B digital marketing Karachi",
      "Facebook ads agency DHA Karachi",
      "Website development Clifton Karachi",
      "SEO services Shahrah-e-Faisal",
      "Corporate lead generation Pakistan",
    ],
    heroHeadline: "Mega-Scale Performance Marketing & Funnels in Karachi",
    heroSubtitle:
      "Karachi ke fast-paced commercial ecosystem ke liye high-volume sales pipelines. Clifton, DHA Karachi, Shahrah-e-Faisal aur Korangi Industrial Area ke businesses ke liye proven ROI funnels.",
    geoCoordinates: {
      latitude: "24.8607",
      longitude: "67.0011",
    },
    keyAreas: [
      "DHA Karachi (Phases 1-8)",
      "Clifton (Blocks 1-9)",
      "Shahrah-e-Faisal & PECHS",
      "Bahria Town Karachi",
      "Gulshan-e-Iqbal & North Nazimabad",
      "Korangi & SITE Industrial Areas",
    ],
    stats: [
      { label: "Karachi Campaigns Managed", value: "95+" },
      { label: "Corporate Leads Generated", value: "110,000+" },
      { label: "Average ROAS", value: "4.5x" },
      { label: "Platform Uptime", value: "99.9%" },
    ],
    marketOverview:
      "Karachi Pakistan ka sab se bara market volume aur consumer base rakhta hai. Yahan speed, automated customer service aur robust infrastructure sab se ahem hain. Agar aapki inquiry handling mein 2 minute se zyada lagta hai to customer competitor ke paas chala jata hai. WATECH fast-paced automated pipelines provide karta hai.",
    serviceSpecialties: [
      {
        title: "B2B & Corporate Lead Generation",
        description:
          "Logistics, financial, software, aur manufacturing firms ke liye high-intent B2B sales leads via LinkedIn, Google Search & Meta.",
        highlight: "C-Level decision maker reach",
      },
      {
        title: "High-Volume Consumer Performance Ads",
        description:
          "Mega city audience ke liye viral video hooks, high-converting offer structures aur instant checkout funnels.",
        highlight: "Lower cost-per-acquisition (CPA)",
      },
      {
        title: "Custom Cloud Software & Automated Portals",
        description:
          "Karachi ke multi-branch karobaron ke liye centralized CRM, inventory tracking, aur WhatsApp billing notifications.",
        highlight: "Real-time cloud synchronization",
      },
    ],
    localMarketChallenges: [
      {
        problem: "Karachi ki market mein competition bohot zyada hai aur ad saturation jaldi ho jati hai.",
        solution: "Hum har 5-7 din baad naye video angles aur fresh creative hooks test karte hain taake ad fatigue na ho.",
      },
      {
        problem: "Customer queries ka volume itna zyada hota hai ke staff respond nahi kar pata.",
        solution: "Hum n8n AI workflow bots lagate hain jo hazaron messages ko instant categorize karke attend karte hain.",
      },
    ],
    caseStudy: {
      clientType: "Commercial Logistics & Fleet Service, Korangi",
      area: "Shahrah-e-Faisal, Karachi",
      resultHeadline: "48 Long-Term Corporate Transport Contracts Secured",
      description:
        "B2B logistics provider cold calling aur manual brochures par rely kar raha tha. WATECH ne targetted Google Search Ads aur Meta B2B Funnel deploy kiya, jisse corporate procurement officers direct in touch aaye.",
      stats: [
        { label: "Quarterly Ad Spend", value: "Rs. 650,000" },
        { label: "Qualified Corporate Leads", value: "142" },
        { label: "Contracts Signed", value: "48 Accounts" },
        { label: "Annual Contract Value", value: "Rs. 3.4 Crore" },
      ],
    },
    pricingPackages: [
      {
        name: "Karachi Growth Starter",
        price: "Rs. 50,000",
        period: "/ month",
        features: [
          "Meta Ads Management for Greater Karachi",
          "15 Modern Visuals & Reels Tailored for Karachi Audience",
          "WhatsApp Direct Flow Setup",
          "DHA, Clifton & PECHS Targeted Campaigns",
          "Weekly Performance Tracking",
        ],
      },
      {
        name: "Mega-City Performance Scaler",
        price: "Rs. 95,000",
        period: "/ month",
        popular: true,
        features: [
          "Omnichannel Meta, Google Search & YouTube Ads",
          "24/7 Automated n8n WhatsApp Qualification Pipeline",
          "Landing Page with Instant WhatsApp Booking",
          "Ad Creative Refresh Every 7 Days (Anti-Fatigue)",
          "Dedicated Karachi Campaign Specialist",
          "Weekly Growth Review with CEO Waseem Abbas",
        ],
      },
    ],
    faqs: [
      {
        question: "Kya WATECH Karachi ke clients ko remote support deta hai ya physical presence hai?",
        answer:
          "Hum poori digital infrastructure, cloud campaigns aur daily monitoring remote live dashboards aur weekly video calls ke zariye 100% transparent tareeqay se chalate hain.",
      },
      {
        question: "Karachi mein Meta Ads aur Google Ads mein se kaunsa behtar hai?",
        answer:
          "Agar aapka product visual hai (e-com, retail, real estate) toh Meta/Instagram behtareen hai. Agar service based hai (lawyer, logistics, B2B) toh Google Search Ads sab se fast ROI dete hain.",
      },
    ],
    whatsappMessage:
      "Assalam-o-Alaikum Watech! Mujhe Karachi market mein apne business funnel aur marketing ads ke hawalay se consult karna hai.",
  },

  // 5. CHINIOT HUB (HERITAGE WOODCRAFT & LOCAL REAL ESTATE CAPITAL)
  {
    slug: "chiniot",
    cityName: "Chiniot",
    province: "Punjab",
    tagline: "World-Famous Chinioti Sheesham Woodcraft & Heritage Property Capital",
    badge: "Authentic Woodcraft & Local Real Estate",
    metaTitle: "Authentic Chinioti Handcrafted Furniture Factory Price & Plots | WATECH Chiniot",
    metaDescription:
      "Direct factory handcrafted pure Sheesham wood furniture from Chiniot. Buy carved bridal bedroom sets, wooden jhoolas, dining tables with factory prices & nationwide delivery to Lahore, Islamabad & Karachi.",
    targetKeywords: [
      "Chinioti furniture factory price",
      "Authentic Chinioti furniture Chiniot",
      "Pure sheesham wood furniture Chiniot",
      "Carved bridal bedroom set Chiniot",
      "Chinioti wooden jhoola swing factory",
      "Plots for sale in Chiniot Chenab Nagar",
      "Chiniot wood furniture market rates",
      "Watech Solutions Chiniot",
    ],
    heroHeadline: "Authentic Chinioti Handcrafted Woodcraft & Prime Plots in Chiniot",
    heroSubtitle:
      "Chiniot ki tareekhi lakri ki karigari ka asool hai: Pure Solid Sheesham, 100% Seasoned Wood, aur pusht-dar-pusht chali aane wali haath ki khudaai. Showroom commission bachayein aur direct factory rate par mangwayein.",
    geoCoordinates: {
      latitude: "31.7200",
      longitude: "72.9789",
    },
    keyAreas: [
      "Katchery Road & Main Woodcraft Market",
      "Chenab Nagar (Rabwah) Bypass Hub",
      "Sargodha Road & Faisalabad Road Commercial Belts",
      "Mohalla Rajanpur & Wood Crafters Guild",
      "Jhang Road Industrial Zone",
      "River Chenab Waterfront Lands",
    ],
    stats: [
      { label: "Direct Factory Master Crafters", value: "35+" },
      { label: "Seasoned Sheesham Wood Stock", value: "100% Pure" },
      { label: "Nationwide Safe Deliveries", value: "4,200+" },
      { label: "Transit Damage Replacement", value: "100% Covered" },
    ],
    marketOverview:
      "Chiniot dunya bhar mein lakri ki nafees tareen khudaai (hand carving) ke liye mashhoor hai. Lekin baray shehron (Lahore, Karachi, Islamabad) ke showrooms Chiniot se saste mein utha kar 3x se 4x mehnga baichte hain. WATECH platform ke zariye buyer direct factory karigar se contact karke asil cheez original rate par khareed sakta hai.",
    serviceSpecialties: [
      {
        title: "Factory Direct Bridal Bedroom Suites",
        description:
          "Heavy royal carving, pure Sheesham wood frames with high-durability deco or walnut polish at exact factory gate pricing.",
        highlight: "50-70% savings vs big city showrooms",
      },
      {
        title: "Traditional Handcrafted Jhoolas & Swings",
        description:
          "Majestic brass-inlaid, floral-carved wooden jhoolas designed for luxury verandas and drawing rooms with heavy brass chain sets.",
        highlight: "Lifetime termite resistance guarantee",
      },
      {
        title: "Chiniot Commercial & Residential Land Deals",
        description:
          "Main Sargodha Road, Faisalabad Road aur Chenab Nagar ke clean verified plots with 100% legal ownership documents.",
        highlight: "Direct seller verified listings",
      },
    ],
    localMarketChallenges: [
      {
        problem: "Doosray shehron ke buyers ko darr hota hai ke online Chinioti furniture mein kachi lakri ya transit damage na ho.",
        solution: "Hum 10-layer foam bubble wrap packaging, live video call inspection, aur 100% safe nationwide delivery guarantee dete hain.",
      },
      {
        problem: "Showrooms duplicate MDF/Lamination furniture ko Chinioti keh kar baich dete hain.",
        solution: "WATECH par sirf 100% solid seasoned Sheesham lakri verify ki jati hai with stamp of authenticity.",
      },
    ],
    caseStudy: {
      clientType: "Overseas Pakistani Bride Family (Islamabad & UK)",
      area: "F-10 Islamabad Delivery",
      resultHeadline: "Full 14-Piece Royal Carved Wedding Set Delivered Safely",
      description:
        "Family ne Islamabad ke showrooms mein 22 Lakh ka estimate dekha tha. WATECH Chiniot direct factory portal se order karne par exactly wohi masterpiece set customized walnut finish mein sirf 9.5 Lakh mein safely ghar deliver hua.",
      stats: [
        { label: "Showroom Quoted Price", value: "Rs. 2,200,000" },
        { label: "WATECH Factory Price", value: "Rs. 950,000" },
        { label: "Buyer Direct Savings", value: "Rs. 1,250,000" },
        { label: "Transit Condition", value: "100% Flawless" },
      ],
    },
    pricingPackages: [
      {
        name: "Classic Heritage Set",
        price: "Rs. 220,000",
        period: "Factory Direct",
        features: [
          "King Size Hand-Carved Sheesham Bed",
          "2 Matching Carved Bedside Tables",
          "Dresser with Large Framed Mirror",
          "High-Gloss Antique Walnut Polish",
          "Safe Foam Bubble Packaging Included",
        ],
      },
      {
        name: "Royal Mughal Bridal Suite",
        price: "Rs. 450,000",
        period: "Factory Direct",
        popular: true,
        features: [
          "Masterpiece Heavy Crown Bed with Velvet Tufting",
          "2 Heavy Carved Bedside Tables",
          "Full 6-Door Wardrobe with Floral Carving",
          "Royal Dressing Table + Stool",
          "Carved Sheesham Coffee Table with 2 Chairs",
          "100% Seasoned Termite-Proof Wood Guarantee",
          "Nationwide Doorstep Delivery Coordination",
        ],
      },
      {
        name: "Signature Handcrafted Jhoola",
        price: "Rs. 165,000",
        period: "Factory Direct",
        features: [
          "Pure Solid Sheesham Traditional Swing",
          "Heavy Brass Chain & Hooks Set Included",
          "Deep Floral Relief Carving",
          "High-Durability Weatherproof Polish",
          "Custom Fabric Seat Cushion",
        ],
      },
    ],
    faqs: [
      {
        question: "Kya main Chiniot aakar factory visit kar sakta hoon?",
        answer:
          "Jee bilkul! Hum aapko Katchery Road par hamari verified workshops aur manufacturing units par khush-amdeed kehte hain jahan aap live lakri aur karigari dekh sakte hain.",
      },
      {
        question: "Agar doosray shehar (Lahore, Karachi, Islamabad) delivery ke doran damage ho jaye to kya hoga?",
        answer:
          "Hum specialized furniture freight trucks use karte hain with multi-layer bubble and wooden crate packing. Agar koi nuqsan ho to hamara karigar foran repair ya piece replace karta hai.",
      },
      {
        question: "Lakri ki kitni guarantee hoti hai?",
        answer:
          "Hum sirf 100% Seasoned Sheesham use karte hain jisme deemak (termites) aur lakri phatne (cracking) ke khilaf lifetime guarantee di jati hai.",
      },
    ],
    whatsappMessage:
      "Assalam-o-Alaikum Watech Chiniot! Mujhe authentic Chinioti furniture aur factory rates ke hawalay se inquiry karni hai.",
  },
];

export function getLocationBySlug(slug: string): CityLocationDetail | undefined {
  return LOCATIONS_DATA.find((l) => l.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS_DATA.map((l) => l.slug);
}

