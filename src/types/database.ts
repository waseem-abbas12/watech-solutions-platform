/**
 * Watech Solutions Multi-Sector Ecosystem Platform
 * Firestore Database TypeScript Schemas & Types
 * Complete strictly typed definitions for all 13 collections
 */

import type { Timestamp } from "firebase/firestore";

export type FirestoreDate = Timestamp | string;

// Common Enums & Roles
export type UserRole = "buyer" | "partner" | "admin" | "superAdmin" | "manager" | "support";
export type SectorCategory = "property" | "furniture" | "event" | "service";

export type PropertyStatus = "active" | "sold" | "inactive" | "pending";
export type FurnitureWoodType = "Sheesham" | "Teak" | "Rosewood" | "Walnut";
export type FurnitureCategory = "Sofa" | "Bed" | "Dining" | "Cabinet" | "Decor";
export type FurnitureStatus = "inStock" | "outOfStock" | "discontinued";

export type EventMenuType = "Desi" | "Chinese" | "BBQ" | "Continental" | "Fusion";
export type EventStatus = "confirmed" | "pending" | "cancelled" | "completed" | "upcoming";

export type InquiryStatus = "new" | "contacted" | "viewed" | "closed" | "converted";
export type OrderStatus = "pending" | "paid" | "completed" | "refunded";
export type PaymentMethod = "cash" | "bank" | "jazzcash" | "easypaisa";
export type TransactionType = "commission" | "payout" | "refund";
export type TransactionStatus = "pending" | "completed" | "failed";

export type NotificationType = "inquiry" | "order" | "commission" | "system" | "low_stock";
export type MessageDirection = "incoming" | "outgoing";

// 1. Users Collection
export interface UserDocument {
  uid: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  agencyName?: string;
  city: string;
  profileImage?: string;
  createdAt: FirestoreDate;
  updatedAt: FirestoreDate;
}

// 2. Properties Collection
export interface PropertyDocument {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  city: string;
  location: { lat: number; lng: number };
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  images: string[];
  featuredImage: string;
  partnerId: string;
  status: PropertyStatus;
  views: number;
  inquiries: number;
  createdAt: FirestoreDate;
  updatedAt: FirestoreDate;
}

// 3. Furniture Collection
export interface FurnitureDocument {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  dimensions: string;
  woodType: FurnitureWoodType;
  color: string;
  category: FurnitureCategory;
  images: string[];
  featuredImage: string;
  partnerId: string;
  stockQuantity: number;
  status: FurnitureStatus;
  views: number;
  inquiries: number;
  createdAt: FirestoreDate;
  updatedAt: FirestoreDate;
}

// 4. Events Collection
export interface EventDocument {
  id: string;
  title: string;
  slug: string;
  venue: string;
  capacity: number;
  menuType: EventMenuType;
  packagePrice: number;
  eventDate: FirestoreDate;
  images: string[];
  featuredImage: string;
  partnerId: string;
  status: EventStatus;
  views: number;
  inquiries: number;
  specialRequests?: string;
  createdAt: FirestoreDate;
  updatedAt: FirestoreDate;
}

// 5. Inquiries Collection
export interface InquiryDocument {
  id: string;
  userId?: string;
  category: SectorCategory;
  itemId?: string;
  itemTitle?: string;
  message: string;
  phone: string;
  email?: string;
  status: InquiryStatus;
  assignedTo?: string;
  notes?: string;
  createdAt: FirestoreDate;
  updatedAt: FirestoreDate;
}

// 6. Favorites Collection
export interface FavoriteDocument {
  id: string;
  userId: string;
  itemId: string;
  category: SectorCategory;
  createdAt: FirestoreDate;
}

// 7. Orders Collection
export interface OrderDocument {
  id: string;
  orderNumber: string; // e.g. ORD-2026-001
  clientId: string;
  itemId: string;
  category: SectorCategory;
  amount: number;
  commission: number; // amount * partner.commissionRate
  partnerId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentDate?: FirestoreDate;
  deliveryDate?: FirestoreDate;
  notes?: string;
  createdAt: FirestoreDate;
  updatedAt: FirestoreDate;
}

// 8. Partners Collection
export interface PartnerDocument {
  id: string;
  userId: string;
  commissionRate: number; // e.g. 0.10
  totalSales: number;
  totalCommissionEarned: number;
  totalLeads: number;
  totalViews: number;
  joinedAt: FirestoreDate;
  status: "active" | "inactive" | "suspended";
  documents?: {
    cnic?: string;
    proofOfBusiness?: string;
  };
}

// 9. Transactions Collection
export interface TransactionDocument {
  id: string;
  orderId: string;
  partnerId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  date: FirestoreDate;
  createdAt: FirestoreDate;
}

// 10. Admins Collection
export interface AdminDocument {
  id: string;
  email: string;
  role: "superAdmin" | "admin" | "manager" | "support";
  fullName: string;
  permissions: string[];
  lastLogin?: FirestoreDate;
  createdAt: FirestoreDate;
}

// 11. Settings Collection
export interface SettingsDocument {
  id: string;
  companyName: string;
  logo: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  defaultCommissionRate: number;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
  };
  maintenanceMode: boolean;
  createdAt: FirestoreDate;
  updatedAt: FirestoreDate;
}

// 12. Notifications Collection
export interface NotificationDocument {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: FirestoreDate;
}

// 13. Messages Collection (WhatsApp Logs)
export interface WhatsAppMessageDocument {
  id: string;
  sender: string; // phone
  receiver: string;
  content: string;
  category?: string;
  timestamp: FirestoreDate;
  direction: MessageDirection;
}
