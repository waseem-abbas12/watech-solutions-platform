export interface PropertyItem {
  id: string;
  title: string;
  city: string;
  location: string;
  price: number;
  type: "Plot" | "House" | "Commercial";
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  partnerPhone: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  woodType: "Sheesham" | "Teak" | "Rosewood";
  category: "Sofa" | "Bed" | "Dining";
  price: number;
  dimensions: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  partnerPhone: string;
}

export interface EventItem {
  id: string;
  title: string;
  city: string;
  venue: string;
  capacity: number;
  menuType: "Desi" | "Chinese" | "BBQ" | "Continental";
  packagePrice: number;
  eventDate: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  partnerPhone: string;
}

export const INITIAL_PROPERTIES: PropertyItem[] = [
  {
    id: "prop-1",
    title: "1 Kanal Luxury Modern Villa",
    city: "Lahore",
    location: "DHA Phase 6, Lahore",
    price: 85000000,
    type: "House",
    bedrooms: 5,
    bathrooms: 6,
    area: "1 Kanal (4,500 Sq Ft)",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Architect-designed brand new bungalow in the heart of DHA Phase 6. Features Spanish porcelain tile flooring, imported SMEG kitchen fittings, master jacuzzi bathrooms, servant quarters, and a manicured rooftop terrace garden. Direct access to Main Boulevard and top international schools.",
    features: ["Corner Lot", "Spanish Tiles", "Smart Home Automation", "Servant Quarter", "Generator Backup Ready", "Rooftop Garden"],
    partnerPhone: "923270831470",
  },
  {
    id: "prop-2",
    title: "10 Marla Brand New Designer House",
    city: "Lahore",
    location: "Bahria Town Sector C, Lahore",
    price: 42000000,
    type: "House",
    bedrooms: 4,
    bathrooms: 5,
    area: "10 Marla (2,250 Sq Ft)",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Centrally located in Sector C, walking distance to Grand Jamia Mosque and commercial market. Double-unit layout perfect for joint family living. Solid ash-wood doors, Grohe bathroom sanitary, and false ceilings with warm ambient LED profiles.",
    features: ["Double Unit", "Ash Wood Doors", "Grohe Sanitary", "Walking Distance to Mosque", "Covered Car Porch"],
    partnerPhone: "923270831470",
  },
  {
    id: "prop-3",
    title: "Corner Commercial Plaza Main Boulevard",
    city: "Islamabad",
    location: "Gulberg Greens, Islamabad",
    price: 165000000,
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 4,
    area: "6,000 Sq Ft",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "High-yield commercial asset offering immediate rental ROI. Basement + Ground + 3 Floors with passenger elevator shaft, dedicated basement parking, and complete CDA commercial building compliance.",
    features: ["Commercial CDA Approved", "Elevator Shaft", "Basement Parking", "High Rental Yield", "Dual Main Road Facing"],
    partnerPhone: "923270831470",
  },
  {
    id: "prop-4",
    title: "5 Marla Residential Ready-to-Build Plot",
    city: "Rawalpindi",
    location: "Bahria Phase 8, Rawalpindi",
    price: 9500000,
    type: "Plot",
    bedrooms: 0,
    bathrooms: 0,
    area: "5 Marla (1,125 Sq Ft)",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "100% on-ground possession plot with all utility connection dues cleared. Peaceful residential sector with 40-feet wide street and adjacent family park.",
    features: ["Possession Available", "Utilities Paid", "Park Facing", "40ft Wide Carpeted Road"],
    partnerPhone: "923270831470",
  },
  {
    id: "prop-5",
    title: "Sea View 3-Bed Luxury Apartment",
    city: "Karachi",
    location: "Emaar Oceanfront, DHA Phase 8, Karachi",
    price: 68000000,
    type: "House",
    bedrooms: 3,
    bathrooms: 4,
    area: "2,400 Sq Ft",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Panoramic Arabian Sea views with floor-to-ceiling double-glazed windows. Private resident beach access, infinity pool, fitness center, and round-the-clock 3-tier biometric security.",
    features: ["Direct Sea View", "Private Beach Access", "Infinity Pool", "Biometric Security", "Dedicated Parking"],
    partnerPhone: "923270831470",
  },
  {
    id: "prop-6",
    title: "1 Kanal Prime Commercial Plot",
    city: "Faisalabad",
    location: "Canal Road, Faisalabad",
    price: 52000000,
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 0,
    area: "1 Kanal (4,500 Sq Ft)",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Unmatched commercial frontage on Canal Road. Suitable for hospital, brand flagship showroom, or corporate headquarters.",
    features: ["Frontage 50ft", "Canal Road Main Access", "Commercial Approved", "High Footfall"],
    partnerPhone: "923270831470",
  },
];

export const INITIAL_FURNITURE: FurnitureItem[] = [
  {
    id: "furn-1",
    name: "Maharaja Royal Chinioti Bed Set",
    woodType: "Sheesham",
    category: "Bed",
    price: 345000,
    dimensions: "King Size (72x78 in) with 2 Side Tables + Dressing",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Master carved by generational artisans in Chiniot. Made from seasoned 100% pure Pakistani Sheesham (Rosewood). Features opulent crown headboard carving with antique gold leaf touch-ups and high-density Turkish velvet tufting.",
    features: ["100% Pure Seasoned Sheesham", "Hand-Carved Crown Details", "Termite Treated 10-Year Guarantee", "High Gloss Lacquer Polish", "Includes 2 Side Tables & Dressing"],
    partnerPhone: "923270831470",
  },
  {
    id: "furn-2",
    name: "Hand-Carved Floral 7-Seater Sofa Set",
    woodType: "Rosewood",
    category: "Sofa",
    price: 285000,
    dimensions: "3+2+1+1 with Center Carved Coffee Table",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Classic Mughal floral relief carvings running along the crown and cabriole legs. Upholstered with imported stain-resistant jacquard fabric and high-resilience Molty Foam padding.",
    features: ["Original Master Carving", "Molty Master Foam (10-yr warranty)", "Stain Resistant Jacquard Fabric", "Solid Rosewood Structure"],
    partnerPhone: "923270831470",
  },
  {
    id: "furn-3",
    name: "Antique 8-Seater Luxury Dining Suite",
    woodType: "Teak",
    category: "Dining",
    price: 395000,
    dimensions: "8x4 ft Glass Top Table with 8 Velvet Chairs",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Grand dining experience built to last decades. Hand-planed solid teak frame with tempered 12mm beveled glass top and ergonomically carved high-back chairs.",
    features: ["12mm Tempered Glass Top", "8 Ergonomic High-Back Chairs", "Durable Natural Teak Stain", "Seamless Mortise & Tenon Joints"],
    partnerPhone: "923270831470",
  },
  {
    id: "furn-4",
    name: "Classic Chinioti Bridal Wing Bed",
    woodType: "Sheesham",
    category: "Bed",
    price: 410000,
    dimensions: "King Size with High-Tufted Headboard",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Custom bridal series featuring extended wings and deep diamond button tufting. Finished with export-grade polyurethane clear coat.",
    features: ["Bridal Extended Wings", "Diamond Button Tufting", "Export Grade Finish", "Reinforced Bed Base"],
    partnerPhone: "923270831470",
  },
  {
    id: "furn-5",
    name: "Crown Carved Chesterfield Sofa 5-Seater",
    woodType: "Sheesham",
    category: "Sofa",
    price: 220000,
    dimensions: "3+1+1 in Turkish Gold Leaf Finish",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Signature blend of European Chesterfield styling with traditional Chinioti wood carving on top crown and feet.",
    features: ["Gold Leaf Accents", "Deep Tufted Back", "Heavy Solid Sheesham Base"],
    partnerPhone: "923270831470",
  },
  {
    id: "furn-6",
    name: "Victorian Round 6-Seater Dining Table",
    woodType: "Rosewood",
    category: "Dining",
    price: 260000,
    dimensions: "5 ft Diameter with Intricate Carved Pedestal",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Compact luxury for cozy dining spaces. Sturdy single-pedestal lion-claw base handcrafted from seasoned rosewood.",
    features: ["Intricate Center Pedestal", "Round Space-Saving Layout", "Includes 6 Cushioned Chairs"],
    partnerPhone: "923270831470",
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "event-1",
    title: "Grand Crystal Ballroom & Lawn",
    city: "Lahore",
    venue: "Royal Palm, Lahore",
    capacity: 1200,
    menuType: "Desi",
    packagePrice: 3800,
    eventDate: "2026-11-20",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Premier wedding and corporate banquet destination in Lahore. Features 24ft high pillarless hall, crystal chandeliers, dedicated bride & groom VIP dressing suites, golf course lawn access, and state-of-the-art climate control.",
    amenities: ["Pillarless Hall", "Dedicated VIP Bridal Suite", "Valet Parking for 500+ Cars", "Standby 500kVA Generator", "Catering & Live Cooking Stations"],
    partnerPhone: "923270831470",
  },
  {
    id: "event-2",
    title: "Margalla View Marquee & Banquet",
    city: "Islamabad",
    venue: "Club Road, Islamabad",
    capacity: 800,
    menuType: "Continental",
    packagePrice: 4500,
    eventDate: "2026-10-15",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Nestled at the foothills of Margalla, offering scenic open-terrace views for Barat, Walima, and high-profile diplomatic summits. World-class continental and fusion menu curated by five-star executive chefs.",
    amenities: ["Scenic Mountain View", "Outdoor Cocktail Terrace", "Executive Chef Custom Menus", "Central Air Conditioning", "Sound & Lighting Rigging"],
    partnerPhone: "923270831470",
  },
  {
    id: "event-3",
    title: "Creek Heritage Hall & Live BBQ Lawn",
    city: "Karachi",
    venue: "DHA Golf Club, Karachi",
    capacity: 650,
    menuType: "BBQ",
    packagePrice: 3200,
    eventDate: "2026-12-05",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Creek-side breeze and open lawn setting famous for live BBQ stations, traditional Karahi, and festive Mehndi nights.",
    amenities: ["Live BBQ Counters", "Seaside Waterfront Breeze", "Custom Floral Decor Packages", "Spacious Lawn"],
    partnerPhone: "923270831470",
  },
  {
    id: "event-4",
    title: "The Palace Banquet & Event Complex",
    city: "Faisalabad",
    venue: "Jaranwala Road, Faisalabad",
    capacity: 1500,
    menuType: "Desi",
    packagePrice: 2800,
    eventDate: "2026-11-28",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Largest luxury air-conditioned complex in Faisalabad, capable of hosting grand wedding gatherings up to 1,500 guests with complete protocol.",
    amenities: ["Grand Capacity up to 1,500", "Full Air-Conditioned Halls", "Huge Parking Lot", "Security Guards & CCTV"],
    partnerPhone: "923270831470",
  },
  {
    id: "event-5",
    title: "Imperial Pan-Asian & Chinese Banquet",
    city: "Lahore",
    venue: "Gulberg III, Lahore",
    capacity: 450,
    menuType: "Chinese",
    packagePrice: 4200,
    eventDate: "2026-10-30",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Intimate banquet hall tailored for corporate dinners, engagements, and Qawwali nights with gourmet Chinese and Pan-Asian spreads.",
    amenities: ["Intimate Luxury Ambience", "Acoustic Treated Sound", "Premium Pan-Asian Menu", "Central Gulberg Location"],
    partnerPhone: "923270831470",
  },
  {
    id: "event-6",
    title: "Sufi Serene Open Air Marquee",
    city: "Rawalpindi",
    venue: "Chaklala Scheme III, Rawalpindi",
    capacity: 900,
    menuType: "Desi",
    packagePrice: 3100,
    eventDate: "2026-12-12",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Grand marquee setting with lush lawn areas, traditional Sufi lighting fixtures, and traditional Pakistani wedding menus.",
    amenities: ["Lush Grass Lawns", "Traditional Decor Setup", "Bridal Suites", "Wide Road Entrance"],
    partnerPhone: "923270831470",
  },
];

// Helper functions for item lookup and related items
export function getItemByCategoryAndId(category: string, id: string) {
  const normCategory = category.toLowerCase();
  if (normCategory === "property" || normCategory === "properties") {
    const item = INITIAL_PROPERTIES.find((p) => p.id === id);
    const related = INITIAL_PROPERTIES.filter((p) => p.id !== id).slice(0, 3);
    return { type: "property" as const, item, related };
  }
  if (normCategory === "furniture") {
    const item = INITIAL_FURNITURE.find((f) => f.id === id);
    const related = INITIAL_FURNITURE.filter((f) => f.id !== id).slice(0, 3);
    return { type: "furniture" as const, item, related };
  }
  if (normCategory === "event" || normCategory === "events") {
    const item = INITIAL_EVENTS.find((e) => e.id === id);
    const related = INITIAL_EVENTS.filter((e) => e.id !== id).slice(0, 3);
    return { type: "event" as const, item, related };
  }
  return null;
}
