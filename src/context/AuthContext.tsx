'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User 
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  userData: any;
  saveProgress: (auraToAdd: number, levelId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setUserData(userSnap.data());
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const saveProgress = async (auraToAdd: number, levelId: number) => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    const currentAura = userData?.aura || 0;
    const currentLevels = userData?.completedLevels || [];
    
    // Check if level already completed to avoid double points
    const alreadyCompleted = currentLevels.includes(levelId);
    const newAura = alreadyCompleted ? currentAura : currentAura + auraToAdd;
    const newLevels = alreadyCompleted ? currentLevels : [...currentLevels, levelId];
    
    const updateData = {
      aura: newAura,
      completedLevels: newLevels,
      lastUpdated: new Date().toISOString()
    };

    await setDoc(userRef, updateData, { merge: true });
    await fetchUserData(user.uid);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut, userData, saveProgress }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
