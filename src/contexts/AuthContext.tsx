import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInAnonymously,
  GoogleAuthProvider, 
  signOut, 
  User as FirebaseUser 
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import firebaseConfig from "../../firebase-applet-config.json";
import { db } from "./FirebaseProvider";

// Initialize Firebase App lazily to protect against crash on missing config
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  role: "citizen" | "authority" | "admin";
  ward?: string;
  createdAt: any;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsDemo: (role: "citizen" | "authority") => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          // Fetch additional profile data from Firestore
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            // Automatically initialize a citizen profile if not found
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "demo.resident@synapse.civic",
              displayName: firebaseUser.displayName || "Demo Resident",
              role: "citizen",
              createdAt: serverTimestamp()
            };
            await setDoc(docRef, newProfile);
            setProfile(newProfile);
          }
        } catch (error) {
          console.error("⚠️ Failed to load or initialize user profile from Firestore:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("⚠️ SSO login error:", error);
      setLoading(false);
      throw error;
    }
  };

  const loginAsDemo = async (role: "citizen" | "authority") => {
    setLoading(true);
    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      
      const newProfile: UserProfile = {
        uid,
        email: role === "authority" ? "authority.lead@synapse.gov" : "demo.resident@synapse.civic",
        displayName: role === "authority" ? "Operations Lead (Ward 4)" : "Demo Resident",
        role,
        ward: role === "authority" ? "Ward 4 - East District" : undefined,
        createdAt: serverTimestamp()
      };

      const docRef = doc(db, "users", uid);
      await setDoc(docRef, newProfile);
      setProfile(newProfile);
    } catch (error) {
      console.error("⚠️ Demo login error:", error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("⚠️ Logout error:", error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginWithGoogle, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
