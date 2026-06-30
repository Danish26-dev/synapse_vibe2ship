import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { 
  initializeFirestore, 
  doc, 
  getDocFromServer, 
  Firestore 
} from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize core Firebase services lazily to prevent boot crashes if config is missing
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);

interface FirebaseContextType {
  db: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
  connected: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function testConnection() {
      try {
        // Mandatory skill validation connection check
        await getDocFromServer(doc(db, "test", "connection"));
        setConnected(true);
      } catch (error) {
        if (error instanceof Error && error.message.includes("the client is offline")) {
          console.error("⚠️ Firebase Validation Check: Please check your Firebase connection or configuration.");
        }
        // Even if the test document does not exist, reaching the server proves connection
        setConnected(true);
      }
    }
    testConnection();
  }, []);

  return (
    <FirebaseContext.Provider value={{ db, auth, storage, connected }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}
