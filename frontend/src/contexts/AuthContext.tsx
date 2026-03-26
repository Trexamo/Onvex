import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { auth, signInWithEmail, signUpWithEmail, signInWithGoogle, logout as firebaseLogout } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'afiliado' | 'produtor' | 'entregador' | 'admin';
  objetivo?: string;
  experiencia?: string;
  faturamento?: string;
  perfil?: string;
  isOnboarded?: boolean;
  createdAt: Date;
}

interface AuthContextData {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  completeOnboarding: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromStorage = (uid: string) => {
    const savedUser = localStorage.getItem(`@onvex:user:${uid}`);
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        const savedUser = loadUserFromStorage(firebaseUser.uid);
        if (savedUser) {
          setUser(savedUser);
        } else {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            role: 'afiliado',
            createdAt: new Date(),
            isOnboarded: false
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const refreshUser = async () => {
    if (firebaseUser) {
      const savedUser = loadUserFromStorage(firebaseUser.uid);
      if (savedUser) {
        setUser(savedUser);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmail(email, password);
      if (result.success && result.user) {
        const savedUser = loadUserFromStorage(result.user.id);
        if (savedUser) {
          setUser(savedUser);
        } else {
          setUser({
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            role: 'afiliado',
            createdAt: new Date(),
            isOnboarded: false
          });
        }
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success && result.user) {
        const savedUser = loadUserFromStorage(result.user.id);
        if (savedUser) {
          setUser(savedUser);
        } else {
          setUser({
            id: result.user.id,
            name: result.user.name || '',
            email: result.user.email,
            role: 'afiliado',
            createdAt: new Date(),
            isOnboarded: false
          });
        }
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await signUpWithEmail(email, password, name);
      if (result.success && result.user) {
        const newUser = {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: 'afiliado' as const,
          createdAt: new Date(),
          isOnboarded: false
        };
        setUser(newUser);
        localStorage.setItem(`@onvex:user:${result.user.id}`, JSON.stringify(newUser));
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
    setFirebaseUser(null);
  };

  const completeOnboarding = async (data: any) => {
    if (firebaseUser && user) {
      const updatedUser = {
        ...user,
        ...data,
        perfil: data.perfil,
        isOnboarded: true
      };
      setUser(updatedUser);
      localStorage.setItem(`@onvex:user:${firebaseUser.uid}`, JSON.stringify(updatedUser));
    }
  };

  const isOnboarded = user ? user.isOnboarded === true : false;

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      loading,
      isOnboarded,
      login,
      loginWithGoogle,
      register,
      logout,
      completeOnboarding,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
