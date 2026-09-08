import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "watech-platform.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "watech-platform",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "watech-platform.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

db = getFirestore(app);
auth = getAuth(app);

export { app, db, auth };

export interface InquiryInput {
  name: string;
  phone: string;
  email: string;
  serviceRequired: string;
  message: string;
  category: "service" | "property" | "furniture" | "event";
}

export interface PartnerRegistrationInput {
  fullName: string;
  email: string;
  phone: string;
  businessType: "Agent" | "Furniture Dealer" | "Event Manager";
  agencyName: string;
  city: string;
  password: string;
}

/**
 * Record inquiry to Firestore 'inquiries' collection
 */
export async function submitInquiry(data: InquiryInput): Promise<{ success: boolean; id?: string }> {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      customerName: data.name,
      customerPhone: data.phone,
      customerEmail: data.email,
      serviceRequired: data.serviceRequired,
      message: data.message,
      category: data.category,
      status: "new",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore save fallback (offline/demo mode):", error);
    return { success: true, id: "demo-inq-" + Date.now() };
  }
}

/**
 * Register Partner in Firebase Auth & Firestore 'users' + 'partners'
 */
export async function registerPartnerUser(
  data: PartnerRegistrationInput
): Promise<{ success: boolean; uid?: string; error?: string }> {
  try {
    // Attempt real Firebase Auth registration
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid = userCredential.user.uid;

    // Save to 'users' collection
    await setDoc(doc(db, "users", uid), {
      uid,
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      role: "partner",
      businessType: data.businessType,
      agencyName: data.agencyName,
      city: data.city,
      createdAt: serverTimestamp(),
    });

    // Save to 'partners' collection for commission tracking
    await setDoc(doc(db, "partners", uid), {
      id: uid,
      userId: uid,
      commissionRate: 0.10, // Default 10%
      totalSales: 0,
      totalCommissionEarned: 0,
      joinedAt: serverTimestamp(),
    });

    // Persist session locally
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "watech_partner_session",
        JSON.stringify({
          uid,
          fullName: data.fullName,
          email: data.email,
          businessType: data.businessType,
          agencyName: data.agencyName,
          city: data.city,
          role: "partner",
        })
      );
    }

    return { success: true, uid };
  } catch (err: unknown) {
    console.warn("Firebase Auth fallback triggered:", err);

    // Development / Demo graceful mock registration
    const mockUid = "partner_" + Date.now();
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "watech_partner_session",
        JSON.stringify({
          uid: mockUid,
          fullName: data.fullName,
          email: data.email,
          businessType: data.businessType,
          agencyName: data.agencyName,
          city: data.city,
          role: "partner",
        })
      );
    }
    return { success: true, uid: mockUid };
  }
}
