export interface PropertyItem {
  id: string;
  title: string;
  city: string;
  location: string;
  price: number;
  type: "House" | "Plot" | "Commercial";
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  partnerPhone: string;
  status?: "Active" | "Sold" | "Pending Approval";
  createdAt?: string;
  isDemo?: boolean;
}

export interface FurnitureItem {
  id: string;
  name: string;
  woodType: "Sheesham" | "Teak" | "Rosewood";
  category: "Bed" | "Sofa" | "Dining" | "Cabinet" | "Console" | "Jhoola" | "Tables" | "Custom";
  price: number;
  dimensions: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  partnerPhone: string;
  status?: "In Stock" | "Sold" | "Made to Order";
  createdAt?: string;
  isDemo?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  city: string;
  venue: string;
  category: "Banquet Hall" | "Catering" | "Wedding Service" | "Corporate Event";
  capacity: number;
  menuType: "Desi" | "Chinese" | "BBQ" | "Continental";
  packagePrice: number;
  eventDate: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  partnerPhone: string;
  status?: "Available" | "Booked";
  createdAt?: string;
  isDemo?: boolean;
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
    status: "Active",
    createdAt: "2026-09-01",
    isDemo: true,
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
    status: "Active",
    createdAt: "2026-09-03",
    isDemo: true,
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
    status: "Active",
    createdAt: "2026-08-25",
    isDemo: true,
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
    status: "Active",
    createdAt: "2026-08-29",
    isDemo: true,
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
    status: "Active",
    createdAt: "2026-08-20",
    isDemo: true,
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
    status: "Active",
    createdAt: "2026-09-02",
    isDemo: true,
  },
  {
    id: "prop-7",
    title: "1 Kanal Developed Residential Plot (Facing Park)",
    city: "Islamabad",
    location: "DHA Phase 2, Sector B, Islamabad",
    price: 34000000,
    type: "Plot",
    bedrooms: 0,
    bathrooms: 0,
    area: "1 Kanal (4,500 Sq Ft)",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Prime park-facing residential plot in prestigious DHA Phase 2 Islamabad. Underground electricity, gas, and fast NOC processing for immediate construction.",
    features: ["Park Facing", "Underground Electrification", "Sui Gas Approved", "Direct Highway Access"],
    partnerPhone: "923270831470",
    status: "Active",
    createdAt: "2026-09-04",
    isDemo: true,
  },
];

export const INITIAL_FURNITURE: FurnitureItem[] = [
  // 1. BEDS & BEDROOM SETS
  {
    id: "furn-1",
    name: "Maharaja Royal Chinioti Bed Set",
    woodType: "Sheesham",
    category: "Bed",
    price: 345000,
    dimensions: "King Size (72x78 in) with 2 Side Tables + Dressing",
    image: "/images/furniture/beds/bedroom_royal_white.webp",
    gallery: [
      "/images/furniture/beds/bedroom_royal_white.webp",
      "/images/furniture/beds/bedroom_cream_gold_bench_set.webp",
      "/images/furniture/beds/bedroom_blue_cream.webp",
    ],
    description: "Master carved by generational artisans in Chiniot. Made from seasoned 100% pure Pakistani Sheesham (Rosewood). Features opulent crown headboard carving with antique gold leaf touch-ups and high-density Turkish velvet tufting.",
    features: ["100% Pure Seasoned Sheesham", "Hand-Carved Crown Details", "Termite Treated 10-Year Guarantee", "High Gloss Lacquer Polish", "Includes 2 Side Tables & Dressing"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-08-28",
    isDemo: true,
  },
  {
    id: "furn-2",
    name: "Classic Chinioti Bridal Wing Bed",
    woodType: "Sheesham",
    category: "Bed",
    price: 410000,
    dimensions: "King Size with High-Tufted Headboard",
    image: "/images/furniture/beds/bedroom_blue_tufted.webp",
    gallery: [
      "/images/furniture/beds/bedroom_blue_tufted.webp",
      "/images/furniture/beds/bedroom_blue_tufted2.webp",
      "/images/furniture/beds/bedroom_brown_carved_set.webp",
    ],
    description: "Custom bridal series featuring extended wings and deep diamond button tufting. Finished with export-grade polyurethane clear coat.",
    features: ["Bridal Extended Wings", "Diamond Button Tufting", "Export Grade Finish", "Reinforced Bed Base"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-02",
    isDemo: true,
  },
  {
    id: "furn-3",
    name: "Heritage Floral Carved King Bedroom Set",
    woodType: "Rosewood",
    category: "Bed",
    price: 480000,
    dimensions: "King Size with Master 3-Door Wardrobe & Carved Dressing",
    image: "/images/furniture/beds/bedroom_blue_floral_set.webp",
    gallery: [
      "/images/furniture/beds/bedroom_blue_floral_set.webp",
      "/images/furniture/beds/bedroom_cream_medallion.webp",
      "/images/furniture/beds/bedroom_brown_carved_set.webp",
    ],
    description: "Exclusive luxury bridal master bedroom suite. Complete with floral carving along headboard arch, double nightstands, and ornate dressing console.",
    features: ["Complete Bridal Package", "Pure Sheesham / Rosewood", "Multi-Stage Antique Hand Polish", "Custom Velvet Fabric Options"],
    partnerPhone: "923270831470",
    status: "Made to Order",
    createdAt: "2026-09-07",
    isDemo: true,
  },

  // 2. SOFAS & LIVING ROOM
  {
    id: "furn-4",
    name: "Hand-Carved Floral 7-Seater Sofa Set",
    woodType: "Rosewood",
    category: "Sofa",
    price: 285000,
    dimensions: "3+2+1+1 with Center Carved Coffee Table",
    image: "/images/furniture/sofas/sofa_cream_gold_set.webp",
    gallery: [
      "/images/furniture/sofas/sofa_cream_gold_set.webp",
      "/images/furniture/sofas/sofa_cream_classic.webp",
      "/images/furniture/sofas/sofa_cream_floral.webp",
    ],
    description: "Classic Mughal floral relief carvings running along the crown and cabriole legs. Upholstered with imported stain-resistant jacquard fabric and high-resilience Molty Foam padding.",
    features: ["Original Master Carving", "Molty Master Foam (10-yr warranty)", "Stain Resistant Jacquard Fabric", "Solid Rosewood Structure"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-08-30",
    isDemo: true,
  },
  {
    id: "furn-5",
    name: "Crown Carved Chesterfield Sofa 5-Seater",
    woodType: "Sheesham",
    category: "Sofa",
    price: 220000,
    dimensions: "3+1+1 in Turkish Gold Leaf Finish",
    image: "/images/furniture/sofas/sofa_black_gold_set.webp",
    gallery: [
      "/images/furniture/sofas/sofa_black_gold_set.webp",
      "/images/furniture/sofas/sofa_black_gold_living_set.webp",
      "/images/furniture/sofas/sofa_blue_velvet_tufted.webp",
    ],
    description: "Signature blend of European Chesterfield styling with traditional Chinioti wood carving on top crown and feet.",
    features: ["Gold Leaf Accents", "Deep Tufted Back", "Heavy Solid Sheesham Base"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-04",
    isDemo: true,
  },
  {
    id: "furn-6",
    name: "Royal Velvet Bridal Chaise Lounge & Diwan",
    woodType: "Sheesham",
    category: "Sofa",
    price: 135000,
    dimensions: "72x32 in with Carved Cabriole Legs",
    image: "/images/furniture/sofas/chaise_cream_gold_elegant2.webp",
    gallery: [
      "/images/furniture/sofas/chaise_cream_gold_elegant2.webp",
      "/images/furniture/sofas/chaise_cream_dark_frame_classic.webp",
      "/images/furniture/sofas/bench_cream_carved_tufted.webp",
    ],
    description: "Exquisite accent piece for living room or bedroom foyer. Deep button-tufted upholstery with solid hand-carved floral crown.",
    features: ["Hand-Carved Crown & Base", "High-Density Foam", "Custom Fabric Colors", "Antique Gold Leaf Gilding"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-08",
    isDemo: true,
  },

  // 3. DINING & CHAIRS
  {
    id: "furn-7",
    name: "Antique 8-Seater Luxury Dining Suite",
    woodType: "Teak",
    category: "Dining",
    price: 395000,
    dimensions: "8x4 ft Glass Top Table with 8 Velvet Chairs",
    image: "/images/furniture/dining/dining_black_gold_grand.webp",
    gallery: [
      "/images/furniture/dining/dining_black_gold_grand.webp",
      "/images/furniture/dining/dining_black_gold.webp",
      "/images/furniture/dining/chairs_black_gold_ornate_pair.webp",
    ],
    description: "Grand dining experience built to last decades. Hand-planed solid teak frame with tempered 12mm beveled glass top and ergonomically carved high-back chairs.",
    features: ["12mm Tempered Glass Top", "8 Ergonomic High-Back Chairs", "Durable Natural Teak Stain", "Seamless Mortise & Tenon Joints"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-08-25",
    isDemo: true,
  },
  {
    id: "furn-8",
    name: "Victorian Round 6-Seater Dining Table",
    woodType: "Rosewood",
    category: "Dining",
    price: 260000,
    dimensions: "5 ft Diameter with Intricate Carved Pedestal",
    image: "/images/furniture/dining/dining_black_gold_curved.webp",
    gallery: [
      "/images/furniture/dining/dining_black_gold_curved.webp",
      "/images/furniture/dining/chairs_cream_gold_curtain_pair.webp",
    ],
    description: "Compact luxury for cozy dining spaces. Sturdy single-pedestal lion-claw base handcrafted from seasoned rosewood.",
    features: ["Intricate Center Pedestal", "Round Space-Saving Layout", "Includes 6 Cushioned Chairs"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-03",
    isDemo: true,
  },
  {
    id: "furn-9",
    name: "Chinioti Royal Throne Dining Armchairs (Pair)",
    woodType: "Sheesham",
    category: "Dining",
    price: 95000,
    dimensions: "Set of 2 High-Back Ornate Host Chairs",
    image: "/images/furniture/dining/chairs_black_gold_throne_pair2.webp",
    gallery: [
      "/images/furniture/dining/chairs_black_gold_throne_pair2.webp",
      "/images/furniture/dining/chairs_black_gold_ornate_pair.webp",
    ],
    description: "Pair of grand master host chairs for the head of the dining table. Pierced openwork carving and plush armrests.",
    features: ["Pierced Openwork Carving", "Padded Armrests", "High Back Support", "Solid Sheesham"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-05",
    isDemo: true,
  },

  // 4. CABINETS & SHOWCASES
  {
    id: "furn-10",
    name: "Royal Heritage 4-Door Crockery Cabinet",
    woodType: "Sheesham",
    category: "Cabinet",
    price: 215000,
    dimensions: "6.5x7 ft with Beveled Glass Displays",
    image: "/images/furniture/cabinets/cabinet_brown_glass_drawers.webp",
    gallery: [
      "/images/furniture/cabinets/cabinet_brown_glass_drawers.webp",
      "/images/furniture/cabinets/cabinet_dark_carved_top.webp",
      "/images/furniture/cabinets/cabinet_brown_panel_drawer.webp",
    ],
    description: "Showcase heirloom china and crystal in full antique splendour. Built from selected seasoned Sheesham with brass drawer handles and interior spotlight fixtures.",
    features: ["Interior Warm Spotlights", "100% Solid Wood Shelves", "Brass Antique Handles", "Safety Lock Installed"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-05",
    isDemo: true,
  },
  {
    id: "furn-11",
    name: "Chinioti Carved Glass Showcase & Bookcase",
    woodType: "Rosewood",
    category: "Cabinet",
    price: 175000,
    dimensions: "5x6.5 ft with Glass Doors & Storage Base",
    image: "/images/furniture/cabinets/bookcase_glass_blue.webp",
    gallery: [
      "/images/furniture/cabinets/bookcase_glass_blue.webp",
      "/images/furniture/cabinets/bookcase_glass_door.webp",
    ],
    description: "Elegant library or drawing room showcase cabinet. Carved crown trim, adjustable solid shelves, and beveled glass doors.",
    features: ["Beveled Glass Doors", "Deep Bottom Drawers", "Termite Proof Solid Rosewood"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-06",
    isDemo: true,
  },

  // 5. CONSOLES & MIRRORS
  {
    id: "furn-12",
    name: "Bespoke Jharoka Carved Wall Console & Mirror",
    woodType: "Rosewood",
    category: "Console",
    price: 145000,
    dimensions: "48x36 in Mirror with 4ft Carved Console Table",
    image: "/images/furniture/consoles/console_carved_inlay_long.webp",
    gallery: [
      "/images/furniture/consoles/console_carved_inlay_long.webp",
      "/images/furniture/consoles/console_carved_dark.webp",
      "/images/furniture/consoles/console_dark_carved_pair.webp",
    ],
    description: "Traditional Pakistani architectural Jharoka window pattern adapted into a foyer mirror and console. Completely customizable in dark walnut or antique gold leaf.",
    features: ["Bespoke Dimensions Available", "Traditional Jharoka Lattice", "Beveled Belgian Mirror Included"],
    partnerPhone: "923270831470",
    status: "Made to Order",
    createdAt: "2026-09-06",
    isDemo: true,
  },
  {
    id: "furn-13",
    name: "Royal Vanity Dressing Console with Stool",
    woodType: "Sheesham",
    category: "Console",
    price: 120000,
    dimensions: "42 in Width with Oval Carved Mirror & Matching Stool",
    image: "/images/furniture/consoles/console_cream_vanity_stool.webp",
    gallery: [
      "/images/furniture/consoles/console_cream_vanity_stool.webp",
      "/images/furniture/consoles/console_dark_unique.webp",
    ],
    description: "Handcrafted Victorian style vanity dresser featuring delicate floral motifs, jewelry drawers, and matching upholstered carved stool.",
    features: ["Oval Beveled Mirror", "Includes Cushioned Stool", "Smooth Velvet-Lined Drawers"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-07",
    isDemo: true,
  },

  // 6. JHOOLAS & SWINGS
  {
    id: "furn-14",
    name: "Grand Mughal Handcrafted Wooden Jhoola",
    woodType: "Sheesham",
    category: "Jhoola",
    price: 295000,
    dimensions: "6.5 ft Height x 6 ft Width, 3-Person Capacity",
    image: "/images/furniture/jhoolas/jhoola_carved.webp",
    gallery: [
      "/images/furniture/jhoolas/jhoola_carved.webp",
      "/images/furniture/jhoolas/jhoola_bench_carved.webp",
      "/images/furniture/jhoolas/jhoola_dark_tall_swing.webp",
    ],
    description: "Authentic royal Chinioti swing (Jhoola) engineered from solid seasoned Sheesham. Heavy ornate pillars, high-grade brass chains, and comfortable deep-seated bench.",
    features: ["Heavy Ornate Pillar Carving", "Reinforced Brass Chains Included", "Weight Bearing up to 350kg", "High Durability Weatherproof Polish"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-08",
    isDemo: true,
  },
  {
    id: "furn-15",
    name: "Traditional Sheesham Canopy Jhoola Swing",
    woodType: "Sheesham",
    category: "Jhoola",
    price: 240000,
    dimensions: "6 ft Height with Carved Wooden Canopy",
    image: "/images/furniture/jhoolas/jhoola_dark_canopy.webp",
    gallery: [
      "/images/furniture/jhoolas/jhoola_dark_canopy.webp",
      "/images/furniture/jhoolas/jhoola_red_canopy.webp",
    ],
    description: "Stately indoor swing complete with carved overhead canopy arch. Ideal for traditional courtyards, drawing rooms, or verandahs.",
    features: ["Overhead Carved Canopy", "Deep Sheesham Seating", "Smooth Ball-Bearing Movement"],
    partnerPhone: "923270831470",
    status: "Made to Order",
    createdAt: "2026-09-08",
    isDemo: true,
  },

  // 7. TABLES & COFFEE SETS
  {
    id: "furn-16",
    name: "Chinioti Wave Trio Nesting Tables (Set of 3)",
    woodType: "Sheesham",
    category: "Tables",
    price: 48000,
    dimensions: "Large (24x18 in), Medium (20x15 in), Small (16x12 in)",
    image: "/images/furniture/tables/nesting_tables_wave_trio.webp",
    gallery: [
      "/images/furniture/tables/nesting_tables_wave_trio.webp",
      "/images/furniture/tables/nesting_tables_wood_pair.webp",
      "/images/furniture/tables/nesting_tables_stools_collection.webp",
    ],
    description: "Functional and artistic set of 3 nesting tables that slide under each other effortlessly. Hand-carved scalloped edges and brass wire inlay work.",
    features: ["Set of 3 Stacking Tables", "Fine Brass Wire Inlay", "Compact Space-Saving", "Solid Seasoned Sheesham"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-05",
    isDemo: true,
  },
  {
    id: "furn-17",
    name: "Master Brass Inlay Carved Side Table",
    woodType: "Rosewood",
    category: "Tables",
    price: 32000,
    dimensions: "20 in Diameter x 22 in Height",
    image: "/images/furniture/tables/sidetable_inlay_mirror.webp",
    gallery: [
      "/images/furniture/tables/sidetable_inlay_mirror.webp",
      "/images/furniture/tables/sidetable_pair_carved.webp",
    ],
    description: "Traditional round corner side table with intricate floral brass inlay (Tarkashi) hand-hammered into rosewood.",
    features: ["Authentic Tarkashi Brass Inlay", "Hand-Turned Pedestal Leg", "Durable Lacquer Polish"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-07",
    isDemo: true,
  },

  // 8. CUSTOM & HANDCRAFTED ART
  {
    id: "furn-18",
    name: "Executive Carved Sheesham Office Desk & Chair Set",
    woodType: "Sheesham",
    category: "Custom",
    price: 210000,
    dimensions: "6x3 ft Executive Desk with High-Back Swivel Carved Chair",
    image: "/images/furniture/custom/desk_dark_wood_chair_set.webp",
    gallery: [
      "/images/furniture/custom/desk_dark_wood_chair_set.webp",
      "/images/furniture/custom/corner_shelf_inlay_unit.webp",
      "/images/furniture/custom/daybed_red.webp",
    ],
    description: "Commanding executive workspace designed for corporate offices, law chambers, and luxury home studies. Hand-carved frontage with cable management provisions.",
    features: ["Solid Sheesham Construction", "Includes Matching Carved Armchair", "Hidden Wire Ports", "Multi-Lock Storage Drawers"],
    partnerPhone: "923270831470",
    status: "Made to Order",
    createdAt: "2026-09-08",
    isDemo: true,
  },
  {
    id: "furn-19",
    name: "Vintage Handcrafted Wooden Artist Easel & Stand",
    woodType: "Rosewood",
    category: "Custom",
    price: 38000,
    dimensions: "Adjustable Height (Up to 6.5 ft)",
    image: "/images/furniture/custom/easel_wood_carved.webp",
    gallery: [
      "/images/furniture/custom/easel_wood_carved.webp",
      "/images/furniture/custom/corner_shelf_inlay_unit.webp",
    ],
    description: "Classic painter's studio display easel hand-carved in seasoned rosewood. Perfect for art studios, gallery displays, or luxury living room canvas displays.",
    features: ["Brass Adjustment Knobs", "Foldable Compact Storage", "Carved Crest Detailing"],
    partnerPhone: "923270831470",
    status: "In Stock",
    createdAt: "2026-09-09",
    isDemo: true,
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  // 1. PAKWAN CENTERS & DAIGS
  {
    id: "event-1",
    title: "Al-Madina Shahi Pakwan Center & Deg Delivery",
    city: "Lahore",
    venue: "Main Boulevard Gulberg III, Lahore",
    category: "Pakwan Center",
    capacity: 1200,
    menuType: "Desi",
    packagePrice: 2800,
    eventDate: "2026-11-20",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Renowned traditional Lahore pakwan center specializing in authentic Shahi Mutton Degs, Chicken Biryani, Zarda, Haleem, and live tandoor setups for grand weddings and family gatherings.",
    amenities: ["Live Tandoor & Roti Station", "Premium Pure Desi Ghee", "Doorstep Daig Delivery & Warmers", "Certified Food Safety & Hygiene", "Full Crockery & Uniformed Waitstaff"],
    partnerPhone: "923270831470",
    status: "Available",
    createdAt: "2026-08-20",
    isDemo: true,
  },
  // 2. RESTAURANTS & DINING
  {
    id: "event-2",
    title: "Margalla Continental & Pan-Asian Dining Restaurant",
    city: "Islamabad",
    venue: "F-7 Markaz, Islamabad",
    category: "Restaurant",
    capacity: 350,
    menuType: "Continental",
    packagePrice: 4200,
    eventDate: "2026-10-15",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Premier fine dining venue in Islamabad offering curated Continental, Mediterranean, and Pan-Asian menus, private banquet suites for corporate lunches, family celebrations, and hi-tea events.",
    amenities: ["Scenic Margalla Ambience", "Private VIP Executive Dining Rooms", "Specialty Hi-Tea & Continental Buffet", "Dedicated Valet Parking", "Custom Birthday & Anniversary Decor"],
    partnerPhone: "923270831470",
    status: "Available",
    createdAt: "2026-08-24",
    isDemo: true,
  },
  // 3. LIVE BBQ & CATERING
  {
    id: "event-3",
    title: "Royal Heritage Live BBQ & Shadi Catering Services",
    city: "Karachi",
    venue: "DHA Phase 6, Karachi",
    category: "Catering",
    capacity: 800,
    menuType: "BBQ",
    packagePrice: 3200,
    eventDate: "2026-12-05",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Karachi's trusted outdoor catering specialist offering live charcoal BBQ, authentic Dum Biryani, fresh seafood griddles, and festive wedding catering with full setup.",
    amenities: ["Live Charcoal BBQ Counter", "Traditional Matka Kheer & Desserts", "Complete Buffet Warmers & Cutlery", "Hygienic Temperature Controlled Transport", "Uniformed Professional Catering Staff"],
    partnerPhone: "923270831470",
    status: "Available",
    createdAt: "2026-09-01",
    isDemo: true,
  },
  // 4. BAKERIES & SWEETS
  {
    id: "event-4",
    title: "Chaman Sweets & Bakers - Pure Desi Ghee Confectionery",
    city: "Faisalabad",
    venue: "D-Ground, Faisalabad",
    category: "Bakeries & Sweets",
    capacity: 1500,
    menuType: "Desi",
    packagePrice: 1800,
    eventDate: "2026-11-28",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Iconic artisanal bakery and sweet maker since 1985. Premium wedding Shadi boxes, pure Desi Ghee Barfi, Gulab Jamun, custom multi-tier wedding cakes, and corporate gift hampers.",
    amenities: ["100% Pure Desi Ghee Guaranteed", "Custom Wedding Shadi Gift Boxes", "Fresh Daily Artisan Bakes", "Bulk Corporate & Shadi Orders", "Island-wide Insulated Delivery"],
    partnerPhone: "923270831470",
    status: "Available",
    createdAt: "2026-09-04",
    isDemo: true,
  },
  // 5. FAST FOOD & BBQ
  {
    id: "event-5",
    title: "Khyber Shinwari BBQ & Dera Restaurant",
    city: "Rawalpindi",
    venue: "Peshawar Road, Rawalpindi",
    category: "Fast Food",
    capacity: 450,
    menuType: "BBQ",
    packagePrice: 2400,
    eventDate: "2026-10-30",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Authentic Shinwari mutton karahi, charcoal sajji, dumpukht, and Peshawari chappal kabab cooked fresh over wood-fired charcoal with traditional family seating and outdoor Dera.",
    amenities: ["Fresh Organic Meat Selection", "Traditional Charpai & Takht Dera", "Family AC Dining Hall", "Fast Takeaway & Delivery", "Outdoor Firepit Seating"],
    partnerPhone: "923270831470",
    status: "Available",
    createdAt: "2026-09-03",
    isDemo: true,
  },
  // 6. FOOD PRODUCTS & SUPPLIERS
  {
    id: "event-6",
    title: "Shan-e-Punjab Organic Spices & FMCG Food Wholesale",
    city: "Multan",
    venue: "Grain Market & Industrial Estate, Multan",
    category: "Food Suppliers",
    capacity: 1000,
    menuType: "Desi",
    packagePrice: 1500,
    eventDate: "2026-12-12",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Direct farm-to-kitchen certified bulk supplier of pure whole spices, Basmati sella rice, premium pulses, edible oils, and food products for commercial restaurants, pakwan centers, and hotels across Pakistan.",
    amenities: ["Certified Laboratory Tested Purity", "Wholesale Bulk Packing (5kg to 50kg)", "Direct Farmer Sourcing", "Nationwide Logistics Dispatch", "Flexible Credit Terms for Verified Partners"],
    partnerPhone: "923270831470",
    status: "Available",
    createdAt: "2026-09-06",
    isDemo: true,
  },
];

// Helper functions for item lookup and related items
export function getItemByCategoryAndId(category: string, id: string) {
  const normCategory = category.toLowerCase();
  if (
    normCategory === "property" ||
    normCategory === "properties" ||
    normCategory === "real-estate" ||
    normCategory === "realestate"
  ) {
    const item = INITIAL_PROPERTIES.find((p) => p.id === id);
    const related = INITIAL_PROPERTIES.filter((p) => p.id !== id).slice(0, 3);
    return { type: "property" as const, item, related };
  }
  if (normCategory === "furniture") {
    const item = INITIAL_FURNITURE.find((f) => f.id === id);
    const related = INITIAL_FURNITURE.filter((f) => f.id !== id).slice(0, 3);
    return { type: "furniture" as const, item, related };
  }
  if (
    normCategory === "event" ||
    normCategory === "events" ||
    normCategory === "food-catering" ||
    normCategory === "food" ||
    normCategory === "catering"
  ) {
    const item = INITIAL_EVENTS.find((e) => e.id === id);
    const related = INITIAL_EVENTS.filter((e) => e.id !== id).slice(0, 3);
    return { type: "event" as const, item, related };
  }
  return null;
}

// ====================================================
// WATECH BLOG ECOSYSTEM (PHASE 2)
// ====================================================

import { BlogPost } from "@/types/database";

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  // 1. REAL ESTATE
  {
    id: "blog-1",
    slug: "pakistan-mein-property-kharidne-se-pehle-7-important-checks",
    title: "Pakistan Mein Property Kharidne Se Pehle 7 Important Checks",
    excerpt: "NOC, registry, fard, utility clearances aur LDA/CDA approvals — ghalti se bachne ke liye har buyer ke liye laazmi checklist.",
    category: "Real Estate",
    author: {
      name: "Malik Muhammad Asif",
      role: "Senior Real Estate Advisor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "September 02, 2026",
    readingTime: "6 min read",
    tags: ["Real Estate", "Property Buying Guide", "Pakistan Real Estate", "DHA Lahore", "CDA Islamabad"],
    isFeatured: true,
    isDemo: true,
    cta: {
      type: "marketplace",
      title: "Looking for 100% Verified Properties in Lahore & Islamabad?",
      description: "Explore our audited portfolio of legal possession houses and plots with clear registry documentation.",
      buttonText: "Browse Verified Properties",
      buttonLink: "/marketplace?tab=properties",
      whatsappMessage: "Assalam-o-Alaikum, I read your blog on 7 Property Checks and want to inquire about verified listings in Lahore/Islamabad.",
    },
    content: `
### Introduction: Property Kharidna Ek Zindagi Ka Faisla Hai

Pakistan ke real estate market mein property kharidna sirf financial investment nahi balkay aik ahem zindagi ka faisla hota hai. Har saal hazaron buyers legal issues, unapproved housing societies aur forged documents ki wajah se apne life savings ko risk mein daal dete hain.

Watech Ecosystem ka maqsad transparent property marketplace faraham karna hai. Is guide mein hum 7 practical checks detail se discuss karenge jo aapko har plot ya ghar kharidne se pehle laazmi karne chahiye.

---

### Check 1: Housing Society Ki Official Approval (NOC Status)

Sab se pehla aur basic check yeh hai ke kya society ko mutalliqa development authority se Approval aur NOC (No Objection Certificate) mila hua hai?
- **Lahore:** LDA (Lahore Development Authority) ya RUDA approved honi chahiye.
- **Islamabad/Rawalpindi:** CDA (Capital Development Authority) ya RDA approved ho.
- **Karachi:** SBCA (Sindh Building Control Authority) approval check karein.

> **Tip:** Kabhi bhi sirf "NOC under process" ke daawe par plot ya file na khareedein jab tak authority ke official portal par society approved show na ho.

---

### Check 2: Zameen Ka Mauza Aur Fard-e-Malkiyat

Agar aap direct zameen ya private plot khareed rahe hain to:
1. **Fard Baraye Bae (فرد برائے بیع):** Patwari ya Arazi Record Center (PLRA) se fresh verified fard haasil karein.
2. **Aks-Shajra (عکس شجرہ):** Zameen ki geographical boundary aur location map verify karein.
3. Tasdeeq karein ke seller ka computerized CNIC record revenue department mein match karta hai.

---

### Check 3: Site Inspection Aur Physical Possession

Kaghzat par plot dekhna aur on-ground plot dekhna do mukhtalif cheezein hain.
- Mauqay par ja kar plot ki actual dimension (e.g. 50x90 for 1 Kanal, 35x65 for 10 Marla) paimaish karein.
- Check karein ke plot ke samne se passing road, street light poles, aur sewerage lines maujood hain.
- High-tension electricity wires ya qabristan ke bilkul qareeb to nahi? Corner aur facing-park plots par premium rates hotay hain lekin unka demand margin bhi high hota hai.

---

### Check 4: Utility NOCs & Pending Dues Clearance

Ghar kharidte waqt previous utility meters ke NOCs aur bills clear hona zaroori hain:
- **Electricity (LESCO/IESCO/KE):** Meter reading aur pending dues check karein.
- **Sui Gas (SNGPL/SSGC):** Gas connection legal hai aur compressor fine to nahi laga?
- **Water & Sanitation / Society Maintenance:** Housing society office se NDC (No Demand Certificate) zaroor talab karein.

---

### Check 5: Bank Lien & Encumbrance Certificate

Kahin seller ne is property par kisi bank ya financial institution se loan to nahi uthaya hua?
- Sub-registrar office se Non-Encumbrance Certificate (Search Report) check karein.
- Agar property mortgaged ho to clearance letter ke baghair transaction hargiz na karein.

---

### Check 6: Legal Sale Agreement (Bayanama) Ki Wazaahat

Bayana dete waqt written agreement mein wazeh terms likhein:
- Total negotiated price aur advance bayana amount.
- Registry / Transfer ki final deadline date.
- Agar koi party back out karti hai to penalty clause.
- Payment hamesha **Bank Pay Order / Crossed Cheque** ke zariye karein, cash transaction se mukammal parhez karein taake legal banking trail maujood rahe.

---

### Check 7: Watech Verified Shield Listing Ka Faida

Watech Marketplace par har property partner profile aur listing admin team ke document audit ke baad live hoti hai. Hum verify karte hain ke listing direct partner ki hai aur market price competitive hai.

Agar aap Lahore, Islamabad ya Karachi mein verified ghar ya plot search kar rahe hain to hamare advisors se direct WhatsApp par mashwara le sakte hain.
    `,
  },

  // 2. FURNITURE & CHINIOTI CRAFT
  {
    id: "blog-2",
    slug: "chinioti-furniture-kharidte-waqt-quality-kaise-check-karein",
    title: "Chinioti Furniture Kharidte Waqt Quality Kaise Check Karein",
    excerpt: "Solid Sheesham pehchanne ka tareeqa, seasoning ke fawaid, hand carving aur machine carving mein farq ka practical guide.",
    category: "Furniture & Chinioti Craft",
    author: {
      name: "Ustad Ghulam Rasool",
      role: "Master Wood Artisan, Chiniot",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    },
    featuredImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "August 28, 2026",
    readingTime: "5 min read",
    tags: ["Chinioti Furniture", "Solid Wood", "Sheesham", "Handcrafted", "Furniture Care"],
    isFeatured: false,
    isDemo: true,
    cta: {
      type: "marketplace",
      title: "Explore 100% Authentic Handcrafted Chinioti Wood Sets",
      description: "Direct artisan master crafted Sheesham bed sets, floral 7-seater sofas, and royal dining tables.",
      buttonText: "Browse Chinioti Collection",
      buttonLink: "/marketplace?tab=furniture",
      whatsappMessage: "Assalam-o-Alaikum, I read your guide on Chinioti furniture quality and would like to see original Sheesham bed & sofa sets.",
    },
    content: `
### Chiniot Ka Asal Virsa: Lakhon Salon Ka Hunar

Punjab ke shehr Chiniot ka lakri ka kaam poori dunya mein apni nafees naqqashi aur mazboot Sheesham lakri ke hawale se jana jata hai. Mughal dor se chalay aane wale yeh artisans lakri ko aam furniture nahi balkay aik fankarana shahkar banate hain.

Lekin aaj market mein sasta MDF, particle board aur semi-hardwood ko "Chinioti Sheesham" keh kar becha ja raha hai. Asal aur naqal mein farq samajhna har buyer ke liye zaroori hai.

---

### 1. Asal Sheesham (Rosewood) Ki Pehchan Kaise Karein?

Sheesham ki pehchan ke 3 basic asool hain:
1. **Natural Grain & Texture:** Sheesham ke andar gehre brown, black aur golden streaks (dhaariyan) natural hoti hain jo kabhi repeat nahi hoti. Agar grain pattern bilkul artificial aur uniform lage to samajh jayein yeh veneer sheet hai.
2. **Weight (Wazan):** Solid Sheesham bohot bhari aur dense lakri hoti hai. Aik standard Chinioti bed frame 100kg+ wazan ka hota hai.
3. **Natural Fragrance:** Taaza kaati ya chisel ki hui Sheesham ki aik makhsoos halki sweet aur woody khushboo hoti hai.

---

### 2. Wood Seasoning Kyun Zaroori Hai?

Sab se ahem marhala seasoning hai. Kachi lakri mein 25% se 40% tak moisture hota hai. Agar furniture kachi lakri se bana diya jaye to:
- 6 se 12 mahinay baad lakri phatne (cracking) lagti hai.
- Bed ke joints dheethe ho jate hain aur aawazein (creaking sound) nikalne lagti hain.
- Darwaze aur drawers phansnay lagte hain.

**Watech Standard:** Hamare Chiniot partners sirf kiln-seasoned lakri istemaal karte hain jisme moisture 10% se 12% tak maintain kiya jata hai, jiski wajah se furniture 50 saal tak bina warp hue rehta hai.

---

### 3. Hand Carving vs CNC Machine Carving

- **CNC Machine:** Computer design se tezi se katati hai lekin uske kinare flat, dull aur be-jaan hotay hain. Carving ki gehrai kam hoti hai.
- **Dasti Naqqashi (Hand Carving):** Ustad artisan apne hath ke cheeni (chisels) se phool ki patiyon ko 3D relief deta hai. Patiyon mein curvature aur roohani khoobsurti hoti hai jo machine kabhi create nahi kar sakti.

---

### 4. Polish Finish Aur Upholstery Standards

- **Lacquer vs Deco Finish:** Royal furniture par multi-coat polyurethane lacquer polish lagti hai jo pani aur garmi se lakri ko mehfooz rakhti hai.
- **Foam:** Sofa ya bed headboard mein hamesha **Molty Master High-Density Foam** ya Turkish springs check karein jo 10 saal tak dabti nahi hain.

Watech Marketplace par direct Chiniot artisans ke sath rabta karein aur factory rates par delivery haasil karein.
    `,
  },

  // 3. FOOD & CATERING
  {
    id: "blog-3",
    slug: "shadi-aur-family-events-ke-liye-food-catering-guide",
    title: "Shadi Aur Family Events Ke Liye Best Food Catering & Pakwan Selection Guide",
    excerpt: "Menu selection, live BBQ stations, traditional shahi degs, per-head budgeting aur food hygiene standards ka complete practical Pakistani guide.",
    category: "Food & Catering",
    author: {
      name: "Farhan Qureshi",
      role: "Head of Food & Hospitality Partnerships",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    featuredImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "August 20, 2026",
    readingTime: "5 min read",
    tags: ["Food & Catering", "Pakwan Center", "Wedding Catering", "Shahi Deg", "Live BBQ", "Lahore Food"],
    isFeatured: false,
    isDemo: true,
    cta: {
      type: "marketplace",
      title: "Explore Verified Food & Catering Packages",
      description: "Compare pakwan centers, restaurants, live BBQ catering, sweets, and per-head rates across Pakistan.",
      buttonText: "Browse Food & Catering",
      buttonLink: "/marketplace?tab=food-catering",
      whatsappMessage: "Assalam-o-Alaikum, I am looking for verified food & catering services on WATECH.",
    },
    content: `
### Shadi Aur Taqreeb Ki Jaan: Khana Aur Catering Service

Pakistan mein kisi bhi Barat, Walima, Mehndi ya Family Dawat ki kamyabi ka 90% daromadar khaney ke taste, khushboo aur garma-garam service par hota hai. Mehmaan decor bhool sakte hain lekin zaiqadaar Biryani, naram Mutton Qorma aur live Seekh Kabab hamesha yaad rakhtay hain.

Achay Pakwan Center aur Catering service ka intekhab waqt par na karne se zaiqa kharab, khana kam par jana, ya thanda khana serve hone jaise masail paish aa sakte hain. Yeh complete practical guide aapko behtareen catering choose karne mein madad degi.

---

### 1. Per-Head Menu vs Shahi Deg System

Pakistan mein catering do tareeqon se arrange hoti hai:
- **Per-Head Buffet Rate (PKR 1,500 se PKR 3,500 tak):** Isme complete crockery, cutlery, uniformed waiters, chafing dish buffet warmers, aur mineral water shamil hota hai. Yeh marquee ya banquet events ke liye best hai.
- **Traditional Deg System (Ghar Ya Dera Dawat):** Jahan aap direct 12kg ya 15kg ki degs book karte hain (e.g. Shahi Mutton Deg, Chicken Dum Biryani, Zarda/Kheer). Isme per-deg rate hota hai aur cost-effective option banta hai.

---

### 2. Meat Quality Aur Gosht Ka Ratio

Pakwan center se baat karte waqt clear specification tay karein:
- **Gosht Ka Weight:** 12kg chawal ki biryani deg mein kam az kam 12kg se 14kg fresh gosht hona chahiye.
- **Fresh vs Frozen:** Hamesha confirmed fresh halal meat (Mutton / Beef / Desi Chicken) ki shart rakhein.
- **Oil vs Pure Desi Ghee:** Shahi Qorma aur Halwa/Zarda ke liye certified Desi Ghee ya high-grade cooking oil specify karein.

---

### 3. Live Counters Ka Trend (BBQ & Tawa)

Aaj kal mehmanon ko cold buffet se zyada live counters pasand aate hain:
- **Live Charcoal BBQ Counter:** Mutton Seekh Kabab, Chicken Malai Boti aur Reshmi Kabab seedhe angethi se plate mein serve hon.
- **Live Tawa & Fried Items:** Garam Tawa Fish, Puri Paratha ya Kat-a-Kat live counter par guests ka shandar response milta hai.
- **Fresh Tandoor:** Tandoori Roti aur Roghni Naan spot par banna laazmi hai taake khana garam rahe.

---

### 4. Food Tasting Session Aur Trial Order

Bari taqreeb se pehle blind booking se bachein:
- Pakwan center se unki ongoing wedding catering ya Sunday special daawat ke din food tasting sample zaroor lein.
- Chawal ki lambai (Extra Long Grain Basmati), masalon ka balance (na zyada tez na pheeka), aur gosht ka galawat check karein.

---

### 5. Hygiene, Service Staff Aur Backup Planning

- **Uniformed Catering Crew:** Waiters ki neat uniform, hairnets aur clean gloves catering standard ka aaina hotay hain.
- **Emergency Reserve:** Hamesha 10% extra capacity ka reserve buffer plan karein taake achanak guests barhne par khana kam na paray.

Watech Marketplace par tamam verified Pakwan Centers, Live BBQ caterers aur Restaurants ke menu rates aur customer reviews direct WhatsApp inquiry ke sath dastiyab hain.
    `,
  },

  // 4. DIGITAL MARKETING
  {
    id: "blog-4",
    slug: "small-business-ke-liye-facebook-ads-kaise-kaam-karte-hain",
    title: "Small Business Ke Liye Facebook Ads Kaise Kaam Karte Hain",
    excerpt: "Kam budget mein genuine Pakistani buyer inquiries kaise generate ki jayein. Boost Post ki ghalti aur Ads Manager ka right tareeqa.",
    category: "Digital Marketing",
    author: {
      name: "Waseem Abbas",
      role: "Founder & Digital Growth Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    featuredImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "September 05, 2026",
    readingTime: "6 min read",
    tags: ["Facebook Ads", "Meta Marketing", "Lead Generation", "Pakistani Business", "Digital Growth"],
    isFeatured: false,
    isDemo: true,
    cta: {
      type: "service",
      title: "Ready to Scale Your Sales with High-ROI Paid Campaigns?",
      description: "Our agency engineers dedicated Meta, Google & TikTok funnels delivering phone-verified leads daily.",
      buttonText: "Grow My Business",
      buttonLink: "/services#growth-form",
      whatsappMessage: "Assalam-o-Alaikum Waseem, I read your article on Facebook Ads and want to run lead generation campaigns for my business.",
    },
    content: `
### Sirf "Boost Post" Dabana Marketing Nahi Hai

Pakistan mein 80% chhotay aur darmiyanay business owners (chahe real estate agent hon, furniture showroom ho, ya boutique) Facebook par post laga kar neeche "Boost Post" ka blue button daba dete hain.

Nateeja? Hazaaron likes aur comments aate hain jinme log sirf "Price?", "AOA", ya "Detail" likhte hain, lekin genuine buyer leads nahi milti.

Is guide mein hum discuss karenge ke professional **Meta Ads Manager** ke zariye serious buying customers kaise target kiye jate hain.

---

### 1. Boost Post vs Meta Ads Manager: Asal Farq Kya Hai?

- **Boost Post (Engagement Objective):** Facebook ka algorithm un logon ko post dikhata hai jo aam tor par like ya scroll karte hain, chahe unki buying power ho ya na ho.
- **Ads Manager (Leads & Sales Objective):** Meta ke machine-learning algorithm ko bataya jata hai ke mujhe sirf wo log chahiye jo **Instant Form fill karein** ya direct **WhatsApp par conversation initiate karein**.

---

### 2. Pakistani Audience Ke Liye Right Targeting Strategy

Real Estate, Furniture aur Luxury Services ke liye broad targeting waste of money hai:
- **Location Radius:** Shehr ke high-income posh areas ko pin-drop karein (e.g. DHA, Bahria, Gulberg, Model Town, F-6/F-7 Islamabad).
- **Device Targeting:** Target karein high-end Android (Samsung S-series) aur iPhone users.
- **Interests Layering:** High-net-worth indicators jaise Luxury lifestyle, Frequent International Travelers, Investment banking, Golf clubs.

---

### 3. Pakistani Buyers Ke Liye Direct WhatsApp Ads Ka Jadoo

Pakistan mein email marketing ka open rate kam hai, lekin WhatsApp open rate **95%+** hai!
- **Click-to-WhatsApp Ads:** Jab customer ad dekhta hai to aik click se uski screen par direct aapka WhatsApp open ho jata hai jisme pre-filled inquiry text likha hota hai.
- Customer ka verified phone number aapke pass foran aa jata hai.

---

### 4. Video Ads (Reels) vs Static Images

2026 mein static photo ads ki conversion 40% gir chuki hai jabke vertical video reels ki conversion 3x zyada hai:
- 30-second ka video banaein jisme product ka real walkthrough ho.
- Pehle 3 second mein strong hook dein: "Kya aap Lahore mein bina commission direct designer house dhoond rahe hain?"
- Clear Call to Action (CTA) dein: "Abhi WhatsApp button dabayein aur price breakdown haasil karein."

Watech Digital Services aapke business ke liye complete Meta, Google aur WhatsApp marketing automate karti hai.
    `,
  },

  // 5. AI & AUTOMATION
  {
    id: "blog-5",
    slug: "small-businesses-ai-automation-se-kya-benefits-le-sakte-hain",
    title: "Small Businesses AI Automation Se Kya Benefits Le Sakte Hain",
    excerpt: "24/7 Roman Urdu customer response, n8n automated lead logging aur manual kaam khatam karne ke practical tareeqe.",
    category: "AI & Automation",
    author: {
      name: "Waseem Abbas",
      role: "AI Workflow & Solutions Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "September 01, 2026",
    readingTime: "5 min read",
    tags: ["AI Automation", "WhatsApp Bots", "n8n Workflows", "Business Efficiency", "Roman Urdu AI"],
    isFeatured: false,
    isDemo: true,
    cta: {
      type: "service",
      title: "Automate Your Customer Support & CRM with AI",
      description: "Deploy autonomous Roman Urdu WhatsApp bots, zero-touch lead routing, and self-hosted n8n workflows.",
      buttonText: "Explore AI Solutions",
      buttonLink: "/services",
      whatsappMessage: "Assalam-o-Alaikum Waseem, I want to set up automated AI workflows and WhatsApp chatbots for my company.",
    },
    content: `
### AI Ab Sirf Bari Tech Companies Ke Liye Nahi Hai

Ziada tar business owners samajhte hain ke Artificial Intelligence (AI) sirf Silicon Valley ki bari companies ke liye hai. Yeh aik bohot bari ghalt-fehmi hai.

2026 mein AI aur no-code tools (jaise self-hosted **n8n**, OpenAI API, aur Meta Cloud API) ke zariye aik 5-logon ki choti company bhi 50-logon ki corporate team jaisi output de sakti hai.

---

### 1. Problem: Slow Response Se Lead zaya Ho Jana

Research ke mutabiq, agar customer ki inquiry ka jawab **pehle 5 minute** ke andar na diya jaye to deal close hone ke chances **80% kam** ho jate hain.
- Raat ke 11 bajay customer plot ya sofa dekh kar inquiry karta hai.
- Aapki sales team subah 10 bajay online aati hai.
- Is doran customer kisi doosre competitor se baat shuru kar chuka hota hai.

---

### 2. Solution: Autonomous WhatsApp Bot in Roman Urdu

Watech AI Bot 24/7 second ke andar reply karta hai:
- Roman Urdu aur English dono samajhta hai.
- "Bhai 1 kanal DHA ka rate kya hai?" → Bot foran accurate price range, high-res photos aur PDF brochure bhej deta hai.
- Customer ka naam, phone number aur budget filter karke subah aapke sales agent ke WhatsApp par lead notification bhej deta hai.

---

### 3. Automated Lead CRM (Zero-Touch Sync)

Jab Meta Facebook ad se inquiry aati hai:
1. AI automation foran lead data fetch karti hai.
2. Google Sheets ya CRM mein log karti hai.
3. Customer ko customized WhatsApp welcome message bhejti hai.
4. Business owner ko mobile alert chala jata hai.
Yeh poora process bina kisi insaani hath ke **2 second** mein mukammal hota hai.

---

### 4. Operational Cost Ki Bachat

Manual receptionist ya data entry staff par mahana hazaron rupay kharch karne ke bajaye, automated AI pipelines aapki inquiry handling speed ko 10x karti hain aur human errors ko 0% par le aati hain.
    `,
  },

  // 6. BUSINESS GROWTH
  {
    id: "blog-6",
    slug: "local-business-ko-online-brand-banane-ka-practical-roadmap",
    title: "Local Business Ko Online Brand Banane Ka Practical Roadmap",
    excerpt: "Showroom aur dukaan se nikal kar digital authority banne ka 4-step framework: Branding, Website, Paid Ads aur Trust Building.",
    category: "Business Growth",
    author: {
      name: "Waseem Abbas",
      role: "Strategic Growth Consultant",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "August 15, 2026",
    readingTime: "7 min read",
    tags: ["Business Growth", "Digital Transformation", "Branding Pakistan", "Online Sales", "Scale Your Business"],
    isFeatured: false,
    isDemo: true,
    cta: {
      type: "service",
      title: "Partner with Watech to Scale Your Business Nationwide",
      description: "Join our verified partner network or hire our digital agency team to turn your business into an authoritative digital brand.",
      buttonText: "Start Growth Consultation",
      buttonLink: "/services#growth-form",
      whatsappMessage: "Assalam-o-Alaikum Waseem, I want to discuss a full digital growth strategy to expand my local business.",
    },
    content: `
### Sirf Physical Showroom Ka Zamana Khatam Ho Chuka Hai

Pehle daur mein agar aapka showroom Main Boulevard, Gulberg ya Chiniot Wood Market mein hota tha to customer chalkar aata tha aur business chalta rehta tha.

Aaj customer showroom aane se pehle **Google, Instagram aur TikTok** par search karta hai. Agar aapka digital footprint nahi hai to aap us customer ke liye exist hi nahi karte.

---

### Step 1: Professional Digital Identity (Design & Branding)

Aapka logo, brand color, aur mobile website aapka modern digital showroom hai:
- Sasti templates ke bajaye modern, ultra-fast Next.js website banayein.
- High-definition real photography lagayein. Stock photos Pakistani customers ko appeal nahi karti hain.
- Google Business Profile (Google Maps) ko 100% complete karein aur real customer reviews lein.

---

### Step 2: Content Marketing Aur Educational Authority

Sirf "Kharido Kharido" kehna band karein:
- Log unse khareedte hain jin par wo aetibar (trust) karte hain.
- Video banayein: "Yeh 5 baatein check karein", "Kachi lakri pehchanne ka tareeqa", "Real estate safe investment".
- Jab aap customer ko guide karte hain to aap market ke undisputed leader ban jate hain.

---

### Step 3: Paid Funnels Aur WhatsApp Lead Generation

Organic reach aahista aati hai, paid advertising tezi se scale karti hai:
- Testing budget se shuru karein (e.g. PKR 50k - 100k mahana).
- Apne best selling product ke liye specific campaign chalayein.
- Har aane wale lead ka data mehfooz karein.

---

### Step 4: Ecosystem Partnership Ka Faida

Akelay grow karna mehnga aur slow hota hai.
Watech Platform ka maqsad yahi hai ke hum verified Real Estate agents, Chinioti manufacturers aur Event vendors ko technology aur customer demand faraham karte hain.

Aapka product authentic ho, technology aur digital scale hum provide karenge.
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);
  return post || null;
}

export function getRelatedBlogPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  const matching = INITIAL_BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );
  if (matching.length >= limit) {
    return matching.slice(0, limit);
  }
  const others = INITIAL_BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );
  return [...matching, ...others].slice(0, limit);
}

