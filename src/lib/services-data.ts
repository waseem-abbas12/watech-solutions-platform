export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface DigitalServiceDetail {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  heroDescription: string;
  stats: { label: string; value: string }[];
  problem: {
    heading: string;
    description: string;
    points: string[];
  };
  solution: {
    heading: string;
    description: string;
    points: string[];
  };
  deliverables: ServiceDeliverable[];
  benefits: { title: string; desc: string }[];
  process: ServiceStep[];
  targetAudience: { title: string; desc: string }[];
  faqs: ServiceFAQ[];
  ctaWhatsAppMessage: string;
}
export const DIGITAL_SERVICES: DigitalServiceDetail[] = [
  // 1. Social Media Marketing
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    badge: "Brand & Organic Reach",
    tagline: "Engage, Build Trust, and Turn Followers Into Real Paying Customers",
    heroDescription:
      "Modern organic social media management tailored for Pakistan's Real Estate agencies, Chinioti furniture showrooms, and food & catering businesses. We craft visual stories, video reels, and educational content that command authority.",
    stats: [
      { label: "Average Reach Lift", value: "3.8x" },
      { label: "Content Production", value: "Weekly 4K" },
      { label: "Response Time Target", value: "< 15 Mins" },
    ],
    problem: {
      heading: "Why Most Social Media Accounts in Pakistan Fail to Generate Deals",
      description:
        "Businesses spend money posting random graphics without narrative, strategy, or community management. The result? Zero engagement, fake follower counts, and zero actual phone inquiries.",
      points: [
        "Generic stock photos that Pakistani customers immediately ignore.",
        "Zero video reels showcasing actual site visits, wood craftsmanship, or food & catering setups.",
        "DMs and comments left un-answered for hours, losing high-intent buyers.",
        "No clear bridge between post engagement and direct WhatsApp conversions.",
      ],
    },
    solution: {
      heading: "Our Strategy: Authority-Driven Visual Storytelling",
      description:
        "We treat your social channels as your digital showroom. We focus on high-fidelity video production, authentic customer walkthroughs, and clear calls-to-action that funnel interested viewers directly into WhatsApp conversations.",
      points: [
        "High-definition site visits, product detailing, and behind-the-scenes reels.",
        "Educational carousel guides addressing buyer doubts and price transparency.",
        "Active community management with pre-approved Roman Urdu response scripts.",
        "Strategic linkage to your Watech verified marketplace listing.",
      ],
    },
    deliverables: [
      {
        title: "Monthly Content Calendar & Visual Strategy",
        description: "16-20 bespoke monthly posts including short-form vertical reels (TikTok, Instagram, Facebook) and informative carousels.",
      },
      {
        title: "Professional Scriptwriting & Copywriting",
        description: "Persuasive captions in bilingual Roman Urdu and English with clear pricing ranges and direct contact CTAs.",
      },
      {
        title: "Dedicated Community & DM Management",
        description: "Active monitoring of comments and inquiries with rapid routing to your WhatsApp sales line.",
      },
      {
        title: "Monthly Analytics & Competitor Audits",
        description: "Transparent reports covering reach, engagement velocity, and inquiry-to-consultation conversion ratios.",
      },
    ],
    benefits: [
      {
        title: "Brand Authority & Trust",
        desc: "Buyers in Real Estate and luxury furniture verify social profiles before paying advances. We build iron-clad credibility.",
      },
      {
        title: "Consistent Organic Inquiries",
        desc: "Well-targeted viral reels bring steady inbound leads without relying 100% on paid ad spend every single day.",
      },
      {
        title: "Asset Library Creation",
        desc: "Every video and photo produced becomes a reusable asset for WhatsApp status updates and sales pitches.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Brand & Audience Audit",
        desc: "We analyze your existing accounts, local competitors, and pinpoint high-value buyer personas in your city.",
      },
      {
        step: "02",
        title: "Content Production & Approval",
        desc: "Our team plans video briefs, shoots high-res assets or edits your raw footage into punchy, high-retention reels.",
      },
      {
        step: "03",
        title: "Scheduled Publishing & Growth",
        desc: "Posts go live during peak Pakistani audience hours (7 PM - 11 PM) with optimized hashtag clusters.",
      },
      {
        step: "04",
        title: "Lead Capture & Optimization",
        desc: "Commenters and DM responders are routed into your WhatsApp sales queue for rapid closing.",
      },
    ],
    targetAudience: [
      {
        title: "Real Estate Agencies & Consultants",
        desc: "Showcase on-ground plot developments, villa walkthroughs, and construction milestones.",
      },
      {
        title: "Chinioti Furniture Showrooms",
        desc: "Demonstrate solid Sheesham wood carving, polish durability, and bedroom set staging.",
      },
      {
        title: "Food, Restaurants & Catering Companies",
        desc: "Showcase mouth-watering culinary videos, wedding catering setups, and behind-the-scenes kitchen hygiene to fill bookings year-round.",
      },
    ],
    faqs: [
      {
        question: "Do you shoot the videos or do we provide the footage?",
        answer:
          "We offer both options. In Lahore, Faisalabad, and Islamabad, our production team can schedule on-site shoots. Alternatively, your team can send raw mobile clips which our editors transform into cinematic reels.",
      },
      {
        question: "How long does it take to see tangible inquiries from organic social media?",
        answer:
          "Most clients begin receiving qualified DMs and WhatsApp inquiries within 3 to 4 weeks of consistent publishing as algorithms learn your target audience.",
      },
      {
        question: "Do you run paid advertisements as part of this service?",
        answer:
          "This service focuses on organic content and community management. If you need hyper-targeted paid ad campaigns, explore our dedicated 'Meta Ads' service.",
      },
    ],
    ctaWhatsAppMessage:
      "Assalam-o-Alaikum Watech team, I am interested in your Social Media Marketing service for my business. Please share pricing and proposal.",
  },  // 2. Meta Ads (Facebook & Instagram)
  {
    slug: "meta-ads",
    title: "Meta Ads & Paid Campaigns",
    badge: "High-ROI Lead Funnels",
    tagline: "Generate Predictable, Phone-Verified Customer Leads Daily",
    heroDescription:
      "Stop wasting budget on 'Boost Post' buttons. We engineer precision-targeted Meta Ads (Facebook & Instagram) with custom WhatsApp click-to-chat funnels and instant CRM sync designed specifically for Pakistani high-ticket industries.",
    stats: [
      { label: "Average Lead Cost", value: "PKR 120 - 350" },
      { label: "Lead Verification Rate", value: "85%+" },
      { label: "Campaign ROAS Potential", value: "4x - 10x" },
    ],
    problem: {
      heading: "The 'Boost Post' Trap: Why Your Ads Get Clicks but No Actual Sales",
      description:
        "Most local businesses click 'Boost Post' on Facebook, selecting broad audiences without pixel tracking, exclusion filters, or lead qualification. You get thousands of fake likes from random profiles and zero genuine buyers.",
      points: [
        "Unfiltered audiences producing irrelevant WhatsApp messages from non-buyers.",
        "Zero tracking of cost-per-qualified-lead (CPL) or conversion rates.",
        "Burned ad budgets due to repetitive, fatigued creatives and poor copywriting.",
        "Slow follow-ups leading to over 70% of potential buyers buying from a competitor.",
      ],
    },
    solution: {
      heading: "Our Precision Paid Meta Engine",
      description:
        "We build full-funnel Meta advertising infrastructure. From high-retention video creatives to lead forms with pre-qualification questions (budget, city, timeline) and direct WhatsApp routing.",
      points: [
        "Hyper-local geographic and interest targeting (DHA, Bahria Town, Gulberg, overseas Pakistanis).",
        "Lead forms requiring phone verification and budget ranges before submission.",
        "A/B split testing of hooks, headlines, and call-to-actions to minimize cost per lead.",
        "Instant WhatsApp alert sent to your sales manager whenever a high-value lead arrives.",
      ],
    },
    deliverables: [
      {
        title: "Full Ads Manager Account & Pixel Architecture",
        description: "Clean setup of Business Manager, Meta Pixel, Conversions API (CAPI), and custom conversion events.",
      },
      {
        title: "High-Converting Ad Creatives & Video Variations",
        description: "Bespoke motion graphics, image carousels, and video ad edits with urgency hooks and compelling Roman Urdu copy.",
      },
      {
        title: "Lead Pre-Qualification Funnel Setup",
        description: "Custom Instant Forms with budget and timeline screening to filter out casual window shoppers.",
      },
      {
        title: "Daily Bid Management & Budget Scaling",
        description: "Constant monitoring of ROAS, frequency capping, audience refresh, and scaling profitable ad sets.",
      },
    ],
    benefits: [
      {
        title: "Predictable Daily Inbound Pipeline",
        desc: "Wake up every morning to 10-30 verified customer inquiries ready to book visits or request price quotations.",
      },
      {
        title: "Overseas Pakistani Targeting",
        desc: "Reach affluent overseas Pakistanis in UK, UAE, Saudi Arabia, and USA actively looking to invest in local property or furnish family homes.",
      },
      {
        title: "Maximized Return on Ad Spend (ROAS)",
        desc: "Cut wasted ad spend by up to 50% by eliminating clickbait audiences and focusing strictly on high-intent demographics.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Irresistible Offer Crafting",
        desc: "We define your core irresistible offer (e.g. 2-Year Installment Plan, Free Bridal Set Delivery, Food & Catering Package Discount).",
      },
      {
        step: "02",
        title: "Creative Production & Copywriting",
        desc: "Our designers produce dynamic video ads and high-converting carousels tested against consumer psychology.",
      },
      {
        step: "03",
        title: "Campaign Launch & Audience Testing",
        desc: "We launch multiple ad sets targeting high-net-worth postcodes, demographic layers, and lookalike audiences.",
      },
      {
        step: "04",
        title: "Scale Winners & Cut Losers",
        desc: "Within 72 hours, we double down on winning ads, trim non-performing sets, and scale your inquiry volume.",
      },
    ],
    targetAudience: [
      {
        title: "Real Estate Developers & Brokers",
        desc: "Sell plots, commercial units, and luxury villas through pre-qualified buyer inquiries.",
      },
      {
        title: "Furniture Brands & Manufacturers",
        desc: "Direct-to-consumer bridal bedroom sets, luxury dining tables, and custom interior orders.",
      },
      {
        title: "Marquees & Event Caterers",
        desc: "Fill wedding season calendar slots 3-6 months in advance with high-budget family bookings.",
      },
    ],
    faqs: [
      {
        question: "What is the recommended monthly ad budget for Meta Ads?",
        answer:
          "For local Pakistani cities, we recommend starting with an ad spend between PKR 60,000 to PKR 150,000 per month. For overseas Pakistani targeting campaigns, PKR 150,000+ is optimal for best algorithm learning.",
      },
      {
        question: "Do you charge a percentage of ad spend or a flat fee?",
        answer:
          "We offer transparent, fixed monthly management retainers for small-to-medium businesses, with zero hidden markups. You pay Meta directly for your advertising spend.",
      },
      {
        question: "How do we receive the leads generated by the campaigns?",
        answer:
          "Leads are routed instantly to your WhatsApp sales number, a live Google Sheet, and your Watech CRM dashboard within seconds of submission.",
      },
    ],
    ctaWhatsAppMessage:
      "Assalam-o-Alaikum Watech team, I want to run high-converting Meta Ads for my business. Let's discuss ad strategy and lead targets.",
  },  // 3. Google Ads (Search & PPC)
  {
    slug: "google-ads",
    title: "Google Ads & Search PPC",
    badge: "Maximum Buyer Intent",
    tagline: "Capture Customers Actively Searching to Buy Right Now",
    heroDescription:
      "When a buyer types '10 marla plot for sale in DHA Lahore' or 'best Chinioti sofa set price in Islamabad', your business must be position #1. We manage high-intent Google Search, Call-Only, and Performance Max campaigns that turn searchers into deals.",
    stats: [
      { label: "Average Conversion Rate", value: "8.4%" },
      { label: "Quality Score Average", value: "8/10" },
      { label: "Intent Level", value: "Immediate Buyer" },
    ],
    problem: {
      heading: "Why Pakistani Businesses Lose Their Best Customers on Google",
      description:
        "Customers searching on Google have urgent intent and ready money. If your website is not ranking at the top, your competitors get the call. Businesses that try Google Ads themselves often bleed money on broad search terms.",
      points: [
        "Paying for irrelevant searches like 'free furniture design' or 'real estate jobs'.",
        "Sending traffic to slow, broken homepages instead of dedicated conversion landing pages.",
        "Zero negative keyword maintenance, draining daily budgets within hours.",
        "Ignoring Call-Only mobile ads which have the highest close rates in Pakistan.",
      ],
    },
    solution: {
      heading: "Our Precision Intent-Driven Search Strategy",
      description:
        "We build tightly themed Google Search ad groups with exact and phrase match keywords, rigorous negative keyword lists, high-relevance ad copy, and mobile click-to-call extensions.",
      points: [
        "Laser-focused commercial intent keywords (e.g. 'buy', 'price', 'booking', 'near me').",
        "Extensive negative keyword lists with over 1,500+ pre-vetted non-buyer terms.",
        "Optimized landing pages engineered for sub-2-second loading on mobile connections.",
        "Direct phone call extensions connecting searchers directly to your lead desk.",
      ],
    },
    deliverables: [
      {
        title: "Comprehensive Keyword & Competitor Research",
        description: "In-depth audit of competitor search terms, bidding prices, and local search volumes across major Pakistani cities.",
      },
      {
        title: "High-Relevance Search Ad Copywriting",
        description: "Compelling headline variations with keyword insertion, trust badges, and local price transparency.",
      },
      {
        title: "Negative Keyword Fortress",
        description: "Proactive exclusion of job seekers, student inquiries, free downloads, and low-budget searchers.",
      },
      {
        title: "Call Tracking & Conversion Attribution",
        description: "Full setup of Google Tag Manager, call tracking metrics, and form submission goal tracking.",
      },
    ],
    benefits: [
      {
        title: "Highest Closing Probability",
        desc: "Google Search traffic converts 3x to 5x higher than social ads because the customer initiated the search with purchase intent.",
      },
      {
        title: "Instant Market Dominance",
        desc: "Appear at the top of Google search results within 24 hours of campaign approval, outranking multi-million dollar portals.",
      },
      {
        title: "Zero Budget Waste",
        desc: "You only pay when a real prospect clicks on your ad or taps your phone number to inquire.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Search Term & Intent Mapping",
        desc: "We identify high-margin keywords where your profit margin easily covers the cost per acquisition.",
      },
      {
        step: "02",
        title: "Ad Structure & Landing Page Alignment",
        desc: "We align ad headlines with dedicated landing page copy to secure a 9+/10 Google Quality Score.",
      },
      {
        step: "03",
        title: "Bidding & Geographical Geo-Fencing",
        desc: "Campaigns are targeted precisely to high-purchasing power postcodes and overseas buyer zones.",
      },
      {
        step: "04",
        title: "Search Term Mining & Optimization",
        desc: "Weekly audits add new profitable search queries and continuously eliminate wasteful terms.",
      },
    ],
    targetAudience: [
      {
        title: "Luxury Home Builders & Real Estate Firms",
        desc: "Capture buyers searching for ready-to-move houses, commercial plazas, and prime plots.",
      },
      {
        title: "Export & High-End Furniture Showrooms",
        desc: "Attain high-ticket orders for master bedroom sets, office furniture, and dining tables.",
      },
      {
        title: "Restaurants, Pakwan Centers & Caterers",
        desc: "Dominate Google searches for wedding catering packages, corporate lunch orders, and local dining.",
      },
    ],
    faqs: [
      {
        question: "How is Google Ads different from SEO?",
        answer:
          "SEO takes 4 to 9 months to rank organically. Google Ads puts you at position #1 immediately today, allowing you to generate calls and leads while long-term SEO is building.",
      },
      {
        question: "Can we target customers in specific cities like Faisalabad or Rawalpindi?",
        answer:
          "Yes. We can pinpoint geographic radius targeting down to specific postal sectors (e.g. DHA Phase 5, Bahria Phase 7, Canal Road).",
      },
      {
        question: "Do you assist with landing pages for Google Ads?",
        answer:
          "Yes, we build dedicated, fast-loading Next.js landing pages with direct WhatsApp and call buttons to maximize Quality Score and conversion rates.",
      },
    ],
    ctaWhatsAppMessage:
      "Assalam-o-Alaikum Watech team, I want to set up high-intent Google Ads for my business. Please share your PPC strategy and audit.",
  },  // 4. Website Development
  {
    slug: "website-development",
    title: "Website & App Development",
    badge: "High Performance Tech",
    tagline: "Ultra-Fast, Mobile-First Platforms Engineered for Conversions",
    heroDescription:
      "A slow, outdated website destroys customer confidence. We build custom Next.js 16 and high-end web platforms engineered for lightning-fast speeds on Pakistani mobile networks, flawless SEO, and frictionless WhatsApp inquiries.",
    stats: [
      { label: "Page Load Speed", value: "< 1.2s" },
      { label: "Google Lighthouse Score", value: "95%+" },
      { label: "Mobile-First Design", value: "100% Tailored" },
    ],
    problem: {
      heading: "Why 80% of Business Websites in Pakistan Never Generate Deals",
      description:
        "Most agencies deliver bloated, cookie-cutter WordPress themes loaded with 40+ plugins. On mobile 3G/4G networks in Pakistan, these sites take 8+ seconds to load, causing 60% of visitors to abandon before reading a single line.",
      points: [
        "Heavy templates that crash on mobile devices and take ages to load.",
        "No dynamic filters for property inventory, furniture wood catalogs, or event menus.",
        "Buried contact forms that force customers to type emails instead of 1-tap WhatsApp chat.",
        "Zero technical SEO architecture, making it invisible on Google search.",
      ],
    },
    solution: {
      heading: "Modern Full-Stack Engineering (Next.js & TypeScript)",
      description:
        "We build clean, custom websites powered by Next.js App Router, Tailwind CSS, and headless database backends. Instant page transitions, pristine mobile layouts, and zero bloat.",
      points: [
        "Server-rendered architecture loading under 1.2 seconds even on slow connections.",
        "Interactive property search, custom furniture calculators, and hall booking calendars.",
        "Prominent floating WhatsApp CTA buttons with dynamic pre-filled inquiries.",
        "Enterprise-grade security with Cloudflare SSL and automated daily backups.",
      ],
    },
    deliverables: [
      {
        title: "Bespoke Modern UI/UX Design",
        description: "Tailored to your brand aesthetic with clean typography, generous whitespace, and luxury visual hierarchy.",
      },
      {
        title: "High-Speed Full-Stack Codebase",
        description: "Built using Next.js 16, TypeScript, Tailwind CSS, and optimized WebP/AVIF image delivery.",
      },
      {
        title: "Inventory / CMS Management Portal",
        description: "User-friendly admin dashboard allowing your staff to add properties, furniture items, or pricing without touching code.",
      },
      {
        title: "Full Technical SEO & Google Search Console Setup",
        description: "Structured schema data, dynamic XML sitemaps, Open Graph social share cards, and Google Indexing.",
      },
    ],
    benefits: [
      {
        title: "2x Higher Visitor-to-Lead Ratio",
        desc: "Instant page speeds and frictionless WhatsApp buttons turn casual site visitors into direct customer phone inquiries.",
      },
      {
        title: "Zero Monthly Plugin Breakdown",
        desc: "Custom code means no broken WordPress updates, zero database bloat, and rock-solid 99.9% server uptime.",
      },
      {
        title: "Scalable Infrastructure",
        desc: "Designed to handle tens of thousands of simultaneous visitors when running massive marketing campaigns.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Requirements & Wireframing",
        desc: "We analyze your catalog, customer journey, and map out high-converting UI/UX wireframes.",
      },
      {
        step: "02",
        title: "Custom Design & Prototype",
        desc: "Interactive visual designs created and approved with your feedback before coding begins.",
      },
      {
        step: "03",
        title: "Full-Stack Development",
        desc: "Engineered in Next.js with strict typing, image optimization, and backend database integrations.",
      },
      {
        step: "04",
        title: "Deployment & Training",
        desc: "Launched on high-speed cloud CDN with staff video training on inventory and lead management.",
      },
    ],
    targetAudience: [
      {
        title: "Real Estate Agencies & Builders",
        desc: "Property listing portals with plot filters, map integration, and virtual tour support.",
      },
      {
        title: "Chinioti Furniture Showrooms",
        desc: "E-commerce and catalog showcases featuring bedroom sets, luxury polish options, and price tiers.",
      },
      {
        title: "Food, Catering & Hospitality Companies",
        desc: "Sophisticated portals featuring catering menus, live BBQ packages, and client testimonials.",
      },
    ],
    faqs: [
      {
        question: "Can our staff update properties or furniture products without coding?",
        answer:
          "Yes. We integrate an intuitive, secure admin dashboard where any team member can upload photos, set prices, and toggle availability in seconds.",
      },
      {
        question: "How long does it take to design and launch a custom platform?",
        answer:
          "A standard business portal takes 2 to 3 weeks. Complex multi-vendor marketplaces or custom portals take 4 to 6 weeks from kickoff to live deployment.",
      },
      {
        question: "Do you provide hosting and ongoing technical support?",
        answer:
          "Yes, we provide ultra-fast cloud hosting with 99.9% uptime, SSL security, and ongoing technical maintenance packages.",
      },
    ],
    ctaWhatsAppMessage:
      "Assalam-o-Alaikum Watech team, I need a modern, fast website for my business. Please share portfolio examples and a price quote.",
  },  // 5. WhatsApp Automation
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation & Bots",
    badge: "Instant 24/7 Response",
    tagline: "Turn Inbound Inquiries Into Booked Appointments in Under 30 Seconds",
    heroDescription:
      "In Pakistan, deals happen on WhatsApp. When a customer reaches out at 11 PM, waiting until 10 AM the next day loses the deal. Our official Meta WhatsApp Cloud API bots reply instantly in natural Roman Urdu and English, share catalogs, and qualify buyers.",
    stats: [
      { label: "Response Time", value: "< 25 Seconds" },
      { label: "Open Rate on WhatsApp", value: "98%" },
      { label: "Lead Qualification", value: "Fully Automated" },
    ],
    problem: {
      heading: "The Cost of Slow WhatsApp Replies in Pakistan",
      description:
        "Pakistani consumers message 3 to 4 competitors simultaneously. Research proves that the business responding within the first 60 seconds wins 78% of all deals. Human agents get overwhelmed, forget follow-ups, and make costly errors.",
      points: [
        "Inquiries arriving at night, weekends, or prayer times remain unanswered for hours.",
        "Sales reps repeatedly typing the same price lists and manually sending PDF catalogs.",
        "Zero automated follow-up when a customer goes silent after asking for prices.",
        "Unorganized customer chats with no record of deal stage or buyer budget.",
      ],
    },
    solution: {
      heading: "Autonomous Meta WhatsApp Business Infrastructure",
      description:
        "We implement official WhatsApp Cloud API automation that works 24/7/365. It greets leads warmly in Roman Urdu, understands intent, shares PDF brochures, collects required details, and alerts your senior closer.",
      points: [
        "Official Green Tick verification assistance & Meta Cloud API compliance.",
        "Interactive button menus (e.g. 'View 5 Marla Plots', 'Bridal Furniture Catalog', 'Order Catering / Inquire').",
        "Automated 24h & 48h re-engagement sequences that revive cold leads.",
        "Multi-agent team inbox where 10+ sales agents share one single verified business number.",
      ],
    },
    deliverables: [
      {
        title: "Official Meta Cloud API Registration & Setup",
        description: "Zero risk of phone number bans using Meta's official API infrastructure.",
      },
      {
        title: "Custom Conversational Bot Flows (Roman Urdu & English)",
        description: "Natural, polite response flows tailored to your specific product catalog and pricing logic.",
      },
      {
        title: "Automated Digital Catalog & Brochure Delivery",
        description: "Instant PDF/image delivery directly into the customer's chat based on their selected interest.",
      },
      {
        title: "Shared Multi-Agent Team Inbox & Mobile App",
        description: "Enable your entire sales force to reply from one central verified business WhatsApp number.",
      },
    ],
    benefits: [
      {
        title: "Instant 30-Second First Contact",
        desc: "Never lose a customer to a faster competitor again. Every single lead gets immediate attention 24/7.",
      },
      {
        title: "Eliminate 80% of Repetitive Sales Rep Work",
        desc: "Your team only speaks to pre-qualified buyers whose budget, city, and interest have already been verified by the bot.",
      },
      {
        title: "Automated Lead Revival Sequences",
        desc: "Automatically send polite follow-up check-ins 24 hours later, recovering up to 25% of abandoned conversations.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Conversation Flow Mapping",
        desc: "We script your FAQs, product catalogs, pricing boundaries, and Roman Urdu conversation trees.",
      },
      {
        step: "02",
        title: "Official Meta API Integration",
        desc: "We register your official WhatsApp Business account and connect it to our webhook engine.",
      },
      {
        step: "03",
        title: "Interactive Menu & Asset Setup",
        desc: "We configure interactive buttons, catalog PDFs, and automated qualifying questionnaires.",
      },
      {
        step: "04",
        title: "Live Testing & Staff Onboarding",
        desc: "We test 50+ customer interaction scenarios and train your team on the multi-agent shared inbox.",
      },
    ],
    targetAudience: [
      {
        title: "Real Estate Brokers & Developers",
        desc: "Send payment schedules, map layouts, and schedule site visits automatically.",
      },
      {
        title: "Furniture Showrooms & Workshops",
        desc: "Instantly share high-res bedroom set photos, polish color swatches, and size dimensions.",
      },
      {
        title: "Food & Catering Businesses",
        desc: "Deliver per-head menu cards, catering packages, and check booking calendar availability.",
      },
    ],
    faqs: [
      {
        question: "Is there any risk of our WhatsApp number getting banned?",
        answer:
          "No. We exclusively use Meta's Official WhatsApp Cloud API, which is 100% compliant with Meta terms of service. Unlike unofficial scraper tools, your number is safe.",
      },
      {
        question: "Can human agents take over the conversation from the bot?",
        answer:
          "Yes! Anytime a customer requests human help or your team wants to step in, the bot pauses and hands over the chat seamlessly to your agent.",
      },
      {
        question: "Can multiple sales staff reply from the same WhatsApp number?",
        answer:
          "Yes. Our shared team inbox allows unlimited agents to chat simultaneously from desktop computers or smartphones using one single company number.",
      },
    ],
    ctaWhatsAppMessage:
      "Assalam-o-Alaikum Watech team, I want to automate my WhatsApp customer responses with a professional bot. Please share demo details.",
  },  // 6. CRM & Consulting
  {
    slug: "crm-consulting",
    title: "CRM & Business Consulting",
    badge: "Operations & Sales Scale",
    tagline: "Stop Lead Leakage and Systemize Your Sales Operations",
    heroDescription:
      "Generating leads is useless if your sales staff forgets to follow up. We implement tailored CRM pipelines, agent commission structures, and business consulting that transform chaotic operations into predictable revenue machines.",
    stats: [
      { label: "Lead Leakage Reduction", value: "90%+" },
      { label: "Follow-Up Consistency", value: "100% Tracked" },
      { label: "Sales Team Accountability", value: "Real-Time KPI" },
    ],
    problem: {
      heading: "The Invisible Revenue Drain: Lost Leads & Forgotten Follow-Ups",
      description:
        "Pakistani businesses lose 40% to 60% of their sales because customer phone numbers are written on paper diaries, lost in personal WhatsApp chats, or forgotten when an employee leaves the company.",
      points: [
        "No central database: When a salesperson resigns, they walk away with your customer contacts.",
        "Zero follow-up tracking: Management has no visibility into how many calls were actually made.",
        "Unclear sales commission disputes between internal agents and external partners.",
        "Manual reporting in chaotic Excel sheets that takes hours to compile every week.",
      ],
    },
    solution: {
      heading: "A Centralized Operating System for Your Business",
      description:
        "We implement custom CRM solutions (cloud-based, accessible from mobile & desktop) where every lead is tracked through stages: New Lead → Contacted → Site Visit Scheduled → Negotiation → Deal Closed.",
      points: [
        "Automated lead assignment: Distribute incoming leads equally among your sales team.",
        "One-click calling and WhatsApp integration with call duration logs.",
        "Automated commission calculation for partners, agents, and in-house staff.",
        "Executive dashboard showing real-time revenue, conversion rates, and staff activity.",
      ],
    },
    deliverables: [
      {
        title: "Custom CRM Deployment & Pipeline Architecture",
        description: "Tailored to your specific industry workflow (Real Estate deals, furniture custom orders, or hall bookings).",
      },
      {
        title: "Data Migration & Centralization",
        description: "Consolidate existing contacts from WhatsApp, spreadsheets, and diaries into one secure cloud database.",
      },
      {
        title: "Sales Team KPI & Commission Configuration",
        description: "Transparent percentage or fixed commission tracking per deal closed.",
      },
      {
        title: "Executive Training & Weekly Operating SOPs",
        description: "Step-by-step training for managers and sales representatives ensuring 100% platform adoption.",
      },
    ],
    benefits: [
      {
        title: "Total Protection of Your Customer Data",
        desc: "Your customer contact list is your biggest business asset. A CRM ensures customer data remains company property forever.",
      },
      {
        title: "30%+ Higher Deal Close Rate",
        desc: "Consistent, scheduled follow-ups ensure that warm prospects are never abandoned before making a purchase decision.",
      },
      {
        title: "Peace of Mind for Business Owners",
        desc: "Open your phone anywhere in the world and view today's revenue, active negotiations, and agent performance in real-time.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Sales Process Audit",
        desc: "We analyze how your team currently handles leads from first phone call to final bank transfer.",
      },
      {
        step: "02",
        title: "Custom Pipeline Configuration",
        desc: "We map deal stages, required fields (plot numbers, wood types, guest counts), and permissions.",
      },
      {
        step: "03",
        title: "Team Onboarding & Hands-On Training",
        desc: "We conduct practical training sessions for your sales staff and management.",
      },
      {
        step: "04",
        title: "Optimization & Quarterly Auditing",
        desc: "Ongoing monitoring to refine pipeline stages and resolve operational bottlenecks.",
      },
    ],
    targetAudience: [
      {
        title: "Real Estate Agencies & Brokerage Houses",
        desc: "Track client property requirements, site visits, token payments, and agent splits.",
      },
      {
        title: "Furniture Showrooms & Export Manufacturers",
        desc: "Manage custom production timelines, advance deposits, polish approvals, and deliveries.",
      },
      {
        title: "Food & Hospitality Groups",
        desc: "Maintain catering booking dates, menu selections, kitchen coordination, and balance dues.",
      },
    ],
    faqs: [
      {
        question: "Is the CRM accessible from smartphones?",
        answer:
          "Yes. The CRM works seamlessly on both Android and iOS mobile devices, as well as desktop web browsers, with instant push notifications for new leads.",
      },
      {
        question: "Will our staff find it difficult to use?",
        answer:
          "Not at all. We design the interface to be as simple as WhatsApp. We provide hands-on video tutorials in Urdu and conduct live onboarding calls.",
      },
      {
        question: "Can we restrict staff from seeing other agents' private leads?",
        answer:
          "Yes. Role-based permissions allow sales reps to only view their assigned leads, while management maintains full executive visibility over the entire company.",
      },
    ],
    ctaWhatsAppMessage:
      "Assalam-o-Alaikum Watech team, I want to implement a CRM and streamline my sales operations. Please share consulting options.",
  },  // 7. AI Automation & Workflows
  {
    slug: "ai-automation",
    title: "AI Automation & Workflows",
    badge: "Future-Ready Operations",
    tagline: "Automate Repetitive Business Tasks with Intelligent Workflows",
    heroDescription:
      "Free your team from soul-crushing manual data entry. We design autonomous n8n and AI workflows that sync leads from Meta and Google, update Google Sheets, trigger WhatsApp alerts, and generate automated contracts in seconds.",
    stats: [
      { label: "Hours Saved Weekly", value: "25+ Hours" },
      { label: "Data Sync Latency", value: "< 5 Seconds" },
      { label: "Human Error Rate", value: "0%" },
    ],
    problem: {
      heading: "The Manual Work Bottleneck in Growing Businesses",
      description:
        "Your staff spends 3 to 4 hours every day downloading CSVs from Facebook, copy-pasting numbers into WhatsApp, creating PDF invoices manually, and sending status updates. When volume spikes, mistakes happen and deals fall through.",
      points: [
        "Manually downloading Meta leads hours after they were submitted.",
        "Typing customer invoices and receipt vouchers one by one.",
        "Forgetting to notify vendors or drivers about furniture deliveries or event setups.",
        "Zero automated syncing between your website, accounting, and marketing tools.",
      ],
    },
    solution: {
      heading: "Autonomous Business Nervous System",
      description:
        "We build self-hosted n8n and AI automations that connect all your business tools together. When an event is booked or a property inquiry is submitted, the system automatically triggers confirmations, updates databases, and drafts contracts.",
      points: [
        "Instant webhook triggers syncing Meta & Google leads directly to WhatsApp in <5 seconds.",
        "Automated PDF contract and invoice generation with digital customer delivery.",
        "Smart inventory alerts when a furniture piece is reserved or a catering order is locked.",
        "AI-powered inquiry summarization delivering executive briefs directly to business owners.",
      ],
    },
    deliverables: [
      {
        title: "Self-Hosted n8n Automation Engine Setup",
        description: "Zero monthly per-task SaaS fees with enterprise-grade data privacy and speed.",
      },
      {
        title: "End-to-End Lead Routing Workflows",
        description: "Connect Facebook, Instagram, Google Ads, website forms, and WhatsApp into one unified flow.",
      },
      {
        title: "Automated Document & Invoice Generator",
        description: "System triggers custom PDF vouchers, booking confirmations, and receipts automatically.",
      },
      {
        title: "Executive Intelligence Bot",
        description: "Receive daily automated 9 PM summaries on WhatsApp reporting new leads, revenue, and pending tasks.",
      },
    ],
    benefits: [
      {
        title: "Scale Without Hiring Extra Admin Staff",
        desc: "Handle 10x higher lead volume without increasing your overhead administrative payroll costs.",
      },
      {
        title: "Zero Delay Between Lead and Sales Action",
        desc: "The moment a customer submits an ad form, your sales rep's phone rings with customer details within seconds.",
      },
      {
        title: "Complete Data Accuracy",
        desc: "Eliminate misspelled phone numbers, duplicate entries, and lost inquiries forever.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Workflow Bottleneck Audit",
        desc: "We identify the top 5 repetitive manual tasks draining your team's time every week.",
      },
      {
        step: "02",
        title: "Architecture & API Connectors",
        desc: "We configure secure webhooks, API tokens, and data mapping across your digital tools.",
      },
      {
        step: "03",
        title: "Automation Build & Stress Testing",
        desc: "We construct and stress-test fail-safe workflows with automatic error-recovery protocols.",
      },
      {
        step: "04",
        title: "Deployment & Executive Briefing",
        desc: "The workflows go live with real-time logging and automated daily performance reports.",
      },
    ],
    targetAudience: [
      {
        title: "High-Volume Real Estate Agencies",
        desc: "Route dozens of daily plot inquiries to specific area specialists automatically.",
      },
      {
        title: "Furniture Showrooms & Custom Crafters",
        desc: "Automate workshop order status alerts sent to clients via WhatsApp as pieces are carved and polished.",
      },
      {
        title: "Food Caterers & Restaurants",
        desc: "Generate automated order lock receipts, menu checklists, and reminder alerts for catering clients.",
      },
    ],
    faqs: [
      {
        question: "Do we have to pay expensive monthly software subscriptions like Zapier?",
        answer:
          "No! We deploy self-hosted automation infrastructure (n8n), meaning you avoid expensive Zapier per-task fees and own your automation setup completely.",
      },
      {
        question: "What happens if one of our connected tools goes offline?",
        answer:
          "Our workflows feature built-in error handling and retries. If an external service is temporarily down, the task queues safely and re-fires automatically without data loss.",
      },
      {
        question: "Can AI summarize customer inquiries before we call them?",
        answer:
          "Yes. Our workflows can analyze long customer messages, extract key details (budget, preferred location, timeline), and present a bulleted summary to your sales team.",
      },
    ],
    ctaWhatsAppMessage:
      "Assalam-o-Alaikum Watech team, I want to automate our manual workflows and lead routing with AI. Please share details.",
  },
];

export function getDigitalServiceBySlug(slug: string): DigitalServiceDetail | null {
  const service = DIGITAL_SERVICES.find((s) => s.slug === slug);
  return service || null;
}

export function getOtherServices(currentSlug: string): DigitalServiceDetail[] {
  return DIGITAL_SERVICES.filter((s) => s.slug !== currentSlug);
}