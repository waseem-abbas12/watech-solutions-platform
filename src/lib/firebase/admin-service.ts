/**
 * Watech Solutions Admin Service
 * Provides full CRUD, state persistence, and mock/live Firestore operations
 * for all 10+ core collections across Real Estate, Furniture, and Events.
 */

export interface PropertyItem {
  id: string;
  title: string;
  price: number;
  city: string;
  location: string;
  status: "Active" | "Pending Approval" | "Sold" | "Inactive";
  partner: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  views: number;
  inquiries: number;
  description: string;
  images: string[];
  featuredImage: string;
  createdAt: string;
  activityLog?: { action: string; timestamp: string; by: string }[];
}

export interface FurnitureItem {
  id: string;
  name: string;
  woodType: "Sheesham" | "Teak" | "Rosewood" | "Walnut";
  category: "Sofa" | "Bed" | "Dining" | "Cabinet" | "Decor";
  price: number;
  stockQuantity: number;
  supplier: string;
  dimensions: string;
  color: string;
  description: string;
  images: string[];
  status: "In Stock" | "Low Stock" | "Out of Stock";
  views: number;
  inquiries: number;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  venue: string;
  eventDate: string; // YYYY-MM-DD
  packagePrice: number;
  capacity: number;
  menuType: "Desi" | "Chinese" | "BBQ" | "Continental" | "Fusion";
  specialRequests?: string;
  notes?: string;
  images: string[];
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  views: number;
  createdAt: string;
}

export interface ClientItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: "Buyer" | "Seller" | "Partner";
  source: "Marketplace Search" | "Google Ads" | "Direct WhatsApp" | "Referral" | "Social Media";
  status: "New" | "Contacted" | "Converted" | "Lost";
  associatedItem: string;
  notes: { text: string; date: string; author: string }[];
  reminder?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string; // e.g. WAT-2026-0089
  client: string;
  clientPhone: string;
  clientEmail?: string;
  item: string;
  category: "Property" | "Furniture" | "Event";
  amount: number;
  commissionRate: number; // e.g. 0.10
  commission: number;
  partner: string;
  paymentMethod: "Bank Transfer" | "Cash" | "JazzCash" | "EasyPaisa";
  status: "Pending" | "Paid" | "Completed" | "Refunded";
  date: string;
  notes?: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  businessType: "Real Estate Agent" | "Furniture Manufacturer" | "Event Vendor";
  agencyName: string;
  city: string;
  commissionRate: number; // e.g. 0.10 for 10%
  totalSales: number;
  totalCommissionEarned: number;
  pendingPayout: number;
  status: "Active" | "Inactive" | "Suspended";
  verificationStatus: "verified" | "pending" | "rejected";
  joinedDate: string;
  listingsCount: number;
  closedDealsCount: number;
  phone: string;
  email: string;
}

export interface InquiryItem {
  id: string;
  client: string;
  phone: string;
  email: string;
  category: "Property" | "Furniture" | "Event" | "Service";
  itemTitle: string;
  message: string;
  status: "New" | "Contacted" | "Viewed" | "Closed" | "Converted";
  assignedTo: string;
  date: string;
  notes?: string;
}

export interface AdminUserItem {
  id: string;
  email: string;
  name: string;
  role: "superAdmin" | "admin" | "manager" | "support";
  permissions: {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canExport: boolean;
    canPayout: boolean;
    canManageAdmins: boolean;
  };
  createdAt: string;
}

export interface SettingsConfig {
  companyName: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  tagline: string;
  defaultCommissionRate: number;
  commissionTiers: { minDeals: number; rate: number }[];
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
  };
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    senderName: string;
  };
  notifications: {
    newInquiry: boolean;
    newOrder: boolean;
    lowStock: boolean;
    partnerRegistration: boolean;
  };
  maintenanceMode: boolean;
}

export interface NotificationItem {
  id: string;
  type: "inquiry" | "order" | "low_stock" | "partner" | "system";
  title: string;
  message: string;
  read: boolean;
  time: string;
  link?: string;
}

export interface TransactionItem {
  id: string;
  orderNumber: string;
  partnerName: string;
  amount: number;
  type: "Payout" | "Commission" | "Refund";
  status: "Completed" | "Pending" | "Failed";
  date: string;
  reference: string;
}

// Initial Mock Datasets
export const INITIAL_PROPERTIES: PropertyItem[] = [
  {
    id: "PROP-101",
    title: "1 Kanal Luxury Modern Villa",
    price: 85000000,
    city: "Lahore",
    location: "DHA Phase 6, Sector C",
    status: "Active",
    partner: "Al-Madina Estate & Builders",
    bedrooms: 5,
    bathrooms: 6,
    area: "1 Kanal (4,500 Sq Ft)",
    views: 1420,
    inquiries: 18,
    description: "Architect-designed brand new bungalow with imported Spanish tiles, SMEG kitchen fittings, and servant quarters.",
    images: ["/images/properties/dha-villa-1.jpg"],
    featuredImage: "/images/properties/dha-villa-1.jpg",
    createdAt: "2026-09-01",
    activityLog: [{ action: "Listing Published", timestamp: "2026-09-01 10:00", by: "superAdmin" }],
  },
  {
    id: "PROP-102",
    title: "10 Marla Brand New Designer House",
    price: 42000000,
    city: "Lahore",
    location: "Bahria Town Sector C",
    status: "Active",
    partner: "Al-Madina Estate & Builders",
    bedrooms: 4,
    bathrooms: 5,
    area: "10 Marla (2,250 Sq Ft)",
    views: 890,
    inquiries: 9,
    description: "Double-unit layout, solid ash wood doors, Grohe sanitary fixtures, and 12kW on-grid solar system.",
    images: ["/images/properties/bahria-house.jpg"],
    featuredImage: "/images/properties/bahria-house.jpg",
    createdAt: "2026-09-03",
    activityLog: [{ action: "Listing Approved", timestamp: "2026-09-03 14:20", by: "admin" }],
  },
  {
    id: "PROP-103",
    title: "Corner Commercial Plaza Main Boulevard",
    price: 165000000,
    city: "Islamabad",
    location: "Gulberg Greens Main Blvd",
    status: "Active",
    partner: "Capital Heights Realtors",
    bedrooms: 0,
    bathrooms: 4,
    area: "6,000 Sq Ft",
    views: 1150,
    inquiries: 14,
    description: "High-yield commercial plaza with elevator shaft, basement parking for 12 cars, and bank tenancy agreement.",
    images: ["/images/properties/gulberg-plaza.jpg"],
    featuredImage: "/images/properties/gulberg-plaza.jpg",
    createdAt: "2026-08-25",
    activityLog: [{ action: "Price Updated", timestamp: "2026-08-28 11:00", by: "manager" }],
  },
  {
    id: "PROP-104",
    title: "5 Marla Residential Ready-to-Build Plot",
    price: 9500000,
    city: "Rawalpindi",
    location: "Bahria Phase 8",
    status: "Sold",
    partner: "Rawal Estate Network",
    bedrooms: 0,
    bathrooms: 0,
    area: "5 Marla (1,125 Sq Ft)",
    views: 620,
    inquiries: 7,
    description: "Level plot situated near park and commercial market with clear possession and all dues paid.",
    images: ["/images/properties/plot-bahria.jpg"],
    featuredImage: "/images/properties/plot-bahria.jpg",
    createdAt: "2026-08-15",
    activityLog: [{ action: "Marked as Sold", timestamp: "2026-09-08 16:30", by: "superAdmin" }],
  },
  {
    id: "PROP-105",
    title: "2 Kanal Farmhouse with Swimming Pool",
    price: 120000000,
    city: "Islamabad",
    location: "Chak Shahzad Farms",
    status: "Pending Approval",
    partner: "New Partner Submissions",
    bedrooms: 6,
    bathrooms: 7,
    area: "2 Kanal",
    views: 310,
    inquiries: 4,
    description: "Newly listed partner inventory awaiting moderator verification and document checks.",
    images: ["/images/properties/farmhouse.jpg"],
    featuredImage: "/images/properties/farmhouse.jpg",
    createdAt: "2026-09-08",
    activityLog: [{ action: "Submitted for Moderation", timestamp: "2026-09-08 09:15", by: "partner" }],
  },
];

export const INITIAL_FURNITURE: FurnitureItem[] = [
  {
    id: "FURN-201",
    name: "Maharaja Royal Chinioti Bed Set",
    woodType: "Sheesham",
    category: "Bed",
    price: 345000,
    stockQuantity: 3, // LOW STOCK (< 5)
    supplier: "Chiniot Royal Woodcraft",
    dimensions: "King Size 72x78 in with 2 Side Tables & Dressing",
    color: "Antique Gold Polish",
    description: "100% Pure solid seasoned Sheesham with master crown relief deep carvings and velvet headboard.",
    images: ["/images/furniture/bed-set.jpg"],
    status: "Low Stock",
    views: 640,
    inquiries: 12,
    createdAt: "2026-08-20",
  },
  {
    id: "FURN-202",
    name: "Hand-Carved Floral 7-Seater Sofa Set",
    woodType: "Rosewood",
    category: "Sofa",
    price: 285000,
    stockQuantity: 8, // WARNING STOCK (< 10)
    supplier: "Chiniot Royal Woodcraft",
    dimensions: "3+2+1+1 with Center Table",
    color: "Rosewood Dark Polish",
    description: "Mughal floral carving with Molty Master foam warranty and imported Turkish damask fabric.",
    images: ["/images/furniture/sofa-set.jpg"],
    status: "In Stock",
    views: 520,
    inquiries: 8,
    createdAt: "2026-08-22",
  },
  {
    id: "FURN-203",
    name: "Antique 8-Seater Luxury Dining Suite",
    woodType: "Teak",
    category: "Dining",
    price: 395000,
    stockQuantity: 2, // CRITICAL STOCK (< 5)
    supplier: "Master Artisan Workshops Chiniot",
    dimensions: "8 ft x 4 ft Glass-Top Table + 8 High-Back Chairs",
    color: "Natural Matte Teak",
    description: "Hand-carved acanthus leaf borders with tempered 12mm beveled glass top.",
    images: ["/images/furniture/dining-suite.jpg"],
    status: "Low Stock",
    views: 410,
    inquiries: 6,
    createdAt: "2026-08-25",
  },
  {
    id: "FURN-204",
    name: "Imperial Vitrine Showcase & Credenza",
    woodType: "Walnut",
    category: "Cabinet",
    price: 185000,
    stockQuantity: 14,
    supplier: "Master Artisan Workshops Chiniot",
    dimensions: "6 ft Wide x 7 ft High",
    color: "Warm Walnut Gloss",
    description: "Beveled glass doors with integrated LED spotlights and brass hardware handles.",
    images: ["/images/furniture/showcase.jpg"],
    status: "In Stock",
    views: 330,
    inquiries: 3,
    createdAt: "2026-09-02",
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "EVT-301",
    title: "Barat Reception & Grand Banquet",
    clientName: "Hamza Tariq",
    clientPhone: "0333 1122334",
    clientEmail: "hamza.tariq@gmail.com",
    venue: "Grand Crystal Ballroom, Royal Palm Lahore",
    eventDate: "2026-09-14", // Upcoming (< 7 days)
    packagePrice: 3800,
    capacity: 650,
    menuType: "Desi",
    specialRequests: "Live Jalebi counter, mutton biryani, and VIP floral stage setup.",
    notes: "Advance 50% deposit received. Final headcount confirmation on Sep 11.",
    images: ["/images/events/barat.jpg"],
    status: "Confirmed",
    views: 510,
    createdAt: "2026-08-15",
  },
  {
    id: "EVT-302",
    title: "Corporate Annual Gala & Awards",
    clientName: "TechLogix Pakistan",
    clientPhone: "0300 5566778",
    clientEmail: "events@techlogix.com.pk",
    venue: "Margalla View Marquee, Islamabad",
    eventDate: "2026-09-12", // Upcoming (< 7 days)
    packagePrice: 4500,
    capacity: 400,
    menuType: "Continental",
    specialRequests: "Stage projector rigging, truss lighting, and podium audio system.",
    notes: "PO-7789 signed by procurement department.",
    images: ["/images/events/corporate.jpg"],
    status: "Confirmed",
    views: 390,
    createdAt: "2026-08-20",
  },
  {
    id: "EVT-303",
    title: "Qawwali Musical Night & Dinner",
    clientName: "Rehman Family Gathering",
    clientPhone: "0321 9988776",
    clientEmail: "rehman@family.org",
    venue: "Heritage Haveli Courtyard, Lahore",
    eventDate: "2026-09-22",
    packagePrice: 3200,
    capacity: 250,
    menuType: "BBQ",
    specialRequests: "Floor seating mattress with Kashmiri cushions and bonfire arrangements.",
    images: ["/images/events/qawwali.jpg"],
    status: "Pending",
    views: 240,
    createdAt: "2026-09-04",
  },
];

export const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: "CLI-401",
    name: "Tariq Mehmood",
    phone: "0300 9876543",
    email: "tariq.mehmood@gmail.com",
    type: "Buyer",
    source: "Marketplace Search",
    status: "Converted",
    associatedItem: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
    notes: [
      { text: "Met at DHA Phase 6 site office on Sep 3.", date: "2026-09-03", author: "superAdmin" },
      { text: "Token money PKR 5,000,000 paid. Registry transfer scheduled for Sep 15.", date: "2026-09-08", author: "superAdmin" },
    ],
    reminder: "Follow up with DHA transfer office for biometric verification on Sep 14.",
    createdAt: "2026-08-28",
  },
  {
    id: "CLI-402",
    name: "Dr. Ayesha Siddiqui",
    phone: "0321 4455667",
    email: "ayesha.siddiqui@hospital.org.pk",
    type: "Buyer",
    source: "Direct WhatsApp",
    status: "Contacted",
    associatedItem: "Maharaja Royal Chinioti Bed Set",
    notes: [
      { text: "Requested customization in dark antique finish and quote for Islamabad delivery.", date: "2026-09-07", author: "manager" },
    ],
    reminder: "Send wood sample photos via WhatsApp tomorrow at 11 AM.",
    createdAt: "2026-09-07",
  },
  {
    id: "CLI-403",
    name: "Hamza Tariq",
    phone: "0333 1122334",
    email: "hamza.tariq@gmail.com",
    type: "Buyer",
    source: "Referral",
    status: "Converted",
    associatedItem: "Barat Reception & Grand Banquet",
    notes: [
      { text: "Menu tasting session completed at Royal Palm. Approved Desi Menu C.", date: "2026-09-02", author: "admin" },
    ],
    createdAt: "2026-08-15",
  },
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "ORD-1",
    orderNumber: "WAT-2026-0089",
    client: "Tariq Mehmood",
    clientPhone: "0300 9876543",
    clientEmail: "tariq.mehmood@gmail.com",
    item: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
    category: "Property",
    amount: 85000000,
    commissionRate: 0.01, // 1% for property
    commission: 850000,
    partner: "Al-Madina Estate & Builders",
    paymentMethod: "Bank Transfer",
    status: "Paid",
    date: "2026-09-08",
    notes: "Official pay order deposited. Registry transfer in progress.",
  },
  {
    id: "ORD-2",
    orderNumber: "WAT-2026-0090",
    client: "Dr. Ayesha Siddiqui",
    clientPhone: "0321 4455667",
    clientEmail: "ayesha.siddiqui@hospital.org.pk",
    item: "Maharaja Royal Chinioti Bed Set",
    category: "Furniture",
    amount: 345000,
    commissionRate: 0.10, // 10%
    commission: 34500,
    partner: "Chiniot Royal Woodcraft",
    paymentMethod: "Bank Transfer",
    status: "Completed",
    date: "2026-09-07",
    notes: "Custom polish applied, packed with bubble wrap and delivered.",
  },
  {
    id: "ORD-3",
    orderNumber: "WAT-2026-0091",
    client: "TechLogix Pakistan",
    clientPhone: "0300 5566778",
    clientEmail: "events@techlogix.com.pk",
    item: "Corporate Annual Gala & Awards",
    category: "Event",
    amount: 1800000,
    commissionRate: 0.08, // 8%
    commission: 144000,
    partner: "Royal Palm Hospitality",
    paymentMethod: "Bank Transfer",
    status: "Pending",
    date: "2026-09-09",
    notes: "Awaiting final invoice settlement from finance department.",
  },
];

export const INITIAL_PARTNERS: PartnerItem[] = [
  {
    id: "PTR-01",
    name: "Malik Muhammad Asif",
    businessType: "Real Estate Agent",
    agencyName: "Al-Madina Estate & Builders",
    city: "Lahore",
    commissionRate: 0.01,
    totalSales: 85000000,
    totalCommissionEarned: 850000,
    pendingPayout: 150000,
    status: "Active",
    verificationStatus: "verified",
    joinedDate: "2026-08-15",
    listingsCount: 4,
    closedDealsCount: 2,
    phone: "0300 1234567",
    email: "asif@almadinaestate.pk",
  },
  {
    id: "PTR-02",
    name: "Ustad Ghulam Rasool",
    businessType: "Furniture Manufacturer",
    agencyName: "Chiniot Royal Woodcraft",
    city: "Chiniot",
    commissionRate: 0.10,
    totalSales: 630000,
    totalCommissionEarned: 63000,
    pendingPayout: 0,
    status: "Active",
    verificationStatus: "verified",
    joinedDate: "2026-08-20",
    listingsCount: 6,
    closedDealsCount: 2,
    phone: "0321 7654321",
    email: "ghulam@chiniotroyal.pk",
  },
  {
    id: "PTR-03",
    name: "Farhan Qureshi",
    businessType: "Event Vendor",
    agencyName: "Royal Palm Hospitality",
    city: "Lahore",
    commissionRate: 0.08,
    totalSales: 1800000,
    totalCommissionEarned: 144000,
    pendingPayout: 44000,
    status: "Active",
    verificationStatus: "verified",
    joinedDate: "2026-08-25",
    listingsCount: 3,
    closedDealsCount: 1,
    phone: "0333 4455667",
    email: "farhan@royalpalm.pk",
  },
];

export const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: "INQ-701",
    client: "Kamran Akram",
    phone: "0321 4567890",
    email: "kamran@akram.pk",
    category: "Property",
    itemTitle: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
    message: "Assalam-o-Alaikum, is this plot corner facing and what is the final negotiable demand?",
    status: "New",
    assignedTo: "Operations Admin",
    date: "2026-09-08 11:20 AM",
  },
  {
    id: "INQ-702",
    client: "Dr. Ayesha Siddiqui",
    phone: "0300 9876543",
    email: "ayesha.siddiqui@gmail.com",
    category: "Furniture",
    itemTitle: "Maharaja Royal Chinioti Bed Set",
    message: "Can you deliver this bed set to Islamabad and is customization in walnut finish possible?",
    status: "Contacted",
    assignedTo: "Floor Manager",
    date: "2026-09-07 04:15 PM",
  },
  {
    id: "INQ-703",
    client: "Hamza Tariq",
    phone: "0333 1122334",
    email: "hamza.tariq@gmail.com",
    category: "Event",
    itemTitle: "Grand Crystal Ballroom, Royal Palm",
    message: "Need booking for 650 guests on Sep 14. Please confirm hall availability and per head menu.",
    status: "Converted",
    assignedTo: "Super Administrator",
    date: "2026-09-06 02:45 PM",
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "NOTIF-01",
    type: "order",
    title: "New Transaction Order #WAT-2026-0089",
    message: "Tariq Mehmood confirmed deal on 1 Kanal Luxury Modern Villa. Deal Amount: PKR 85,000,000.",
    read: false,
    time: "10 mins ago",
    link: "/admin/orders",
  },
  {
    id: "NOTIF-02",
    type: "inquiry",
    title: "New High-Intent Client Inquiry",
    message: "Kamran Akram submitted inquiry on 1 Kanal Luxury Modern Villa (DHA Phase 6).",
    read: false,
    time: "45 mins ago",
    link: "/admin/inquiries",
  },
  {
    id: "NOTIF-03",
    type: "low_stock",
    title: "Low Stock Alert: Antique 8-Seater Dining Suite",
    message: "Inventory count reached 2 items left at Chiniot workshop warehouse. Restock recommended.",
    read: false,
    time: "2 hours ago",
    link: "/admin/furniture",
  },
  {
    id: "NOTIF-04",
    type: "partner",
    title: "New Partner Registration: Farhan Qureshi",
    message: "Royal Palm Hospitality verified in Events & Catering sector.",
    read: true,
    time: "1 day ago",
    link: "/admin/partners",
  },
];

export const INITIAL_SETTINGS: SettingsConfig = {
  companyName: "Watech Solutions Ecosystem",
  logo: "/images/logo.png",
  favicon: "/favicon.ico",
  contactEmail: "info@watechsolutions.com",
  contactPhone: "+92 300 1234567",
  address: "DHA Phase 6, Main Boulevard, Lahore, Pakistan",
  tagline: "Pakistan's Premier Multi-Sector Business Platform",
  defaultCommissionRate: 10,
  commissionTiers: [
    { minDeals: 1, rate: 10 },
    { minDeals: 5, rate: 8 },
    { minDeals: 15, rate: 5 },
  ],
  socialLinks: {
    facebook: "https://facebook.com/watechsolutions",
    instagram: "https://instagram.com/watechsolutions",
    youtube: "https://youtube.com/watechsolutions",
    tiktok: "https://tiktok.com/@watechsolutions",
    linkedin: "https://linkedin.com/company/watechsolutions",
  },
  emailSettings: {
    smtpHost: "smtp.mailgun.org",
    smtpPort: 587,
    smtpUser: "postmaster@watechsolutions.com",
    senderName: "Watech Platform Automated Alerts",
  },
  notifications: {
    newInquiry: true,
    newOrder: true,
    lowStock: true,
    partnerRegistration: true,
  },
  maintenanceMode: false,
};

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: "ADM-1",
    email: "superadmin@watechsolutions.com",
    name: "Super Administrator",
    role: "superAdmin",
    permissions: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canExport: true,
      canPayout: true,
      canManageAdmins: true,
    },
    createdAt: "2026-01-01",
  },
  {
    id: "ADM-2",
    email: "operations@watechsolutions.com",
    name: "Operations Admin",
    role: "admin",
    permissions: {
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canExport: true,
      canPayout: true,
      canManageAdmins: false,
    },
    createdAt: "2026-03-15",
  },
  {
    id: "ADM-3",
    email: "manager@watechsolutions.com",
    name: "Floor Manager",
    role: "manager",
    permissions: {
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canExport: true,
      canPayout: false,
      canManageAdmins: false,
    },
    createdAt: "2026-05-10",
  },
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: "TXN-8801",
    orderNumber: "WAT-2026-0089",
    partnerName: "Al-Madina Estate & Builders",
    amount: 150000,
    type: "Payout",
    status: "Completed",
    date: "2026-09-08",
    reference: "HBL-FT-99304128",
  },
  {
    id: "TXN-8802",
    orderNumber: "WAT-2026-0090",
    partnerName: "Chiniot Royal Woodcraft",
    amount: 34500,
    type: "Commission",
    status: "Completed",
    date: "2026-09-07",
    reference: "MCB-IB-4410923",
  },
];
