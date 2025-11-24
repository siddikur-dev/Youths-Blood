// context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      setUser(session.user);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setUser(null);
      localStorage.setItem('isLoggedIn', 'false');
    }
  }, [session]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This would be replaced with actual API call
    if (email === 'user@youthblood.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setUser(null);
  };

  const register = async (userData: any): Promise<boolean> => {
    // Demo registration
    localStorage.setItem('isLoggedIn', 'true');
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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