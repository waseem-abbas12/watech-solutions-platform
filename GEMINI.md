# Watech Multi-Sector Platform — Guidelines & Standards (GEMINI.md)

Yeh document hamare project ke coding standards, design system rules, aur agent behavior guidelines ko define karta hai taake poori development consistent, clean aur scaleable rahe.

---

## 1. Project Overview & Architecture

- **Project Name:** Watech Solutions Multi-Sector Ecosystem Platform
- **Sectors:**
  1. **Real Estate** (Plots, Houses, Commercial Properties)
  2. **Furniture** (Authentic Chinioti Handcrafted Wood Furniture)
  3. **Events** (Banquet Halls, Catering, Event Management)
- **Journeys:**
  1. **Services** (Digital Agency / Tech / CRM Solutions for clients) — Accent: `Blue (#2563EB)`
  2. **Products** (Direct Marketplace for Buyers) — Accent: `Green (#16A34A)`
  3. **Partners** (Agents, Furniture Manufacturers, Event Vendors) — Accent: `Orange (#EA580C)`
- **Core Tech Stack:**
  - **Framework:** Next.js 16 (App Router)
  - **Language:** TypeScript (Strict Mode enabled)
  - **Styling:** Tailwind CSS 4
  - **Animations:** Framer Motion
  - **Backend & Database:** Firebase (Authentication, Cloud Firestore, Cloud Storage)
  - **State Management:** Zustand / React Context (Lightweight)

---

## 2. Coding Standards (TypeScript & React/Next.js)

### TypeScript Rules
- **Strict Mode:** Har file mein strict typing laazmi hogi. `any` type ka istemaal strictly prohibited hai. Unknown cases ke liye `unknown` aur type guards use karein.
- **Explicit Interfaces & Types:** Har data model (`User`, `Property`, `FurnitureItem`, `EventService`, `Lead`, `Commission`) ke types `types/` folder mein define honge.
- **Naming Conventions:**
  - Types/Interfaces: PascalCase (e.g. `PropertyListing`, `PartnerProfile`)
  - Components: PascalCase (e.g. `PropertyCard`, `ServiceHeroSection`)
  - Functions & Variables: camelCase (e.g. `fetchProperties`, `isSubmitting`)
  - Constants: UPPER_SNAKE_CASE (e.g. `DEFAULT_CURRENCY`, `SECTOR_TYPES`)

### Next.js 16 & React Architecture
- **Server vs Client Components:**
  - Default tor par har component ko **Server Component** banayein taake fast page loading aur zero client bundle mile.
  - Sirf wahan `'use client'` lagayein jahan interactivity ho: Framer Motion animations, form state, Firebase auth hooks, ya modals.
- **Folder Isolation:**
  - Shared UI: `components/ui/`
  - Sector-specific components: `components/real-estate/`, `components/furniture/`, `components/events/`
  - Journey-specific components: `components/services/`, `components/partners/`
- **Firebase Best Practices:**
  - Client SDK hooks alag honge (`lib/firebase/client.ts`, `hooks/useAuth.ts`).
  - Server actions / Admin SDK calls alag honge (`lib/firebase/admin.ts`).
  - Read-heavy queries ke liye pagination aur indexing pehle se define ki jaye gi.

---

## 3. Design System Rules ("Minimal but Scroll-Stopping")

### Color Palette
- **Base Canvas:**
  - Pure White: `#FFFFFF`
  - Background Secondary: `#F8FAFC` (Slate-50)
  - Text Primary: `#0F172A` (Slate-900)
  - Text Muted: `#64748B` (Slate-500)
  - Border Subdued: `#E2E8F0` (Slate-200)
- **Journey Accents:**
  - **Services Journey:** `#2563EB` (Electric Blue) — Trust, Technology, Professionalism
  - **Products / Marketplace:** `#16A34A` (Emerald Green) — Growth, Luxury, Natural Wood, Value
  - **Partners Portal:** `#EA580C` (Vibrant Orange) — Energy, Community, Earning, High Impact

### Typography & Spacing
- **Font Stack:** Modern Sans-Serif (`Inter` / `Plus Jakarta Sans` via `next/font`).
- **Hierarchy:**
  - Display Titles: `text-4xl md:text-6xl font-bold tracking-tight`
  - Section Headings: `text-2xl md:text-3xl font-semibold`
  - Body Text: `text-base md:text-lg text-slate-600 leading-relaxed`
- **Spacing Principle:**
  - Generous whitespace (`py-16 md:py-24` for sections).
  - Clean card padding (`p-6 md:p-8`), rounded corners (`rounded-2xl` ya `rounded-3xl`).
  - Soft shadows (`shadow-sm` on default, `shadow-xl` on hover lift).

### Animation Guidelines (Framer Motion)
- **Philosophy:** Subtle, fluid, aur modern — kabhi bhi distracting ya slow na ho.
- **Standards:**
  - Page entry: Fade-in with slight vertical slide (`initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}`)
  - Staggered Lists: Grid items ya feature lists ke liye container stagger (`staggerChildren: 0.08`)
  - Interactive Hover: Cards par subtle upward lift (`whileHover={{ y: -6, scale: 1.01 }}`)

### Pakistan-First & Mobile Optimization
- **Bandwidth Friendly:** Images lazy-loaded, modern WebP/AVIF formats through `next/image`.
- **Offline & Slow Connection Grace:** Loading skeletons aur optimistic UI updates.
- **Direct WhatsApp Integration:** Quick CTAs direct WhatsApp chat ke liye with pre-filled inquiry text for property, furniture, ya event booking.

---

## 4. Agent Behavior Guidelines

1. **Strict Planning First:** Koi bhi functional code likhne se pehle user ka explicit approval lena laazmi hai.
2. **Language Consistency:** User ke sath conversation aur technical explanations Roman Urdu mein ki jayengi.
3. **No Code Clutter:** Code modular, self-explanatory, aur production-grade hoga. Placeholder text ya dead code nahi chhora jayega.
4. **Step-by-Step Verification:** Har step complete hone ke baad build test ya validation plan chalana zaroori hai.
