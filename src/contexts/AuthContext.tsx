
import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockSupabase } from '@/lib/supabase-client';

type User = {
  id: string;
  email?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (credentials: { email?: string; password?: string; phone?: string }) => Promise<void>;
  signUp: (credentials: { email?: string; password?: string; phone?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const getInitialSession = async () => {
      try {
        const { data } = await mockSupabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getInitialSession();
  }, []);

  const signIn = async (credentials: { email?: string; password?: string; phone?: string }) => {
    try {
      const { data, error } = await mockSupabase.auth.signIn(credentials);
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (credentials: { email?: string; password?: string; phone?: string }) => {
    try {
      const { data, error } = await mockSupabase.auth.signUp(credentials);
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await mockSupabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
