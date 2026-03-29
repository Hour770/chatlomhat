"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { config } from '@/config';
import { 
  UserData, 
  SolverHistoryItem,
  ExerciseHistoryItem,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
} from '@/lib/cookies';

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  requestOtp: (email: string) => Promise<{ success: boolean; devCode?: string; error?: string }>;
  verifyOtp: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  addToSolverHistory: (question: string, answer: string) => Promise<void>;
  addToExerciseHistory: (topic: string, difficulty: string, exercises: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function for API calls with auth
async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(`${config.apiUrl}${endpoint}`, {
    ...options,
    headers,
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user session on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await fetchWithAuth('/auth/me');
          const data = await response.json();
          
          if (data.success && data.user) {
            setUser({
              ...data.user,
              solverHistory: data.solverHistory || [],
              exerciseHistory: data.exerciseHistory || [],
            });
          } else {
            // Token invalid, clear it
            clearAuthToken();
          }
        } catch (error) {
          console.error('Error loading user:', error);
          clearAuthToken();
        }
      }
      setIsLoading(false);
    };
    
    loadUser();
  }, []);

  const refreshUser = async () => {
    const token = getAuthToken();
    if (!token) return;
    
    try {
      const response = await fetchWithAuth('/auth/me');
      const data = await response.json();
      
      if (data.success && data.user) {
        setUser({
          ...data.user,
          solverHistory: data.solverHistory || [],
          exerciseHistory: data.exerciseHistory || [],
        });
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const requestOtp = async (email: string): Promise<{ success: boolean; devCode?: string; error?: string }> => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        return { success: true, devCode: data.devCode };
      } else {
        return { success: false, error: data.error || 'Sign in failed.' };
      }
    } catch (error) {
      console.error('Request OTP error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const verifyOtp = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (data.success && data.token && data.user) {
        setAuthToken(data.token);
        setUser({
          ...data.user,
          solverHistory: data.solverHistory || [],
          exerciseHistory: data.exerciseHistory || [],
        });
        return { success: true };
      } else {
        return { success: false, error: data.error || 'OTP verification failed.' };
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const signUp = async (email: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      const data = await response.json();
      
      if (data.success && data.token && data.user) {
        setAuthToken(data.token);
        setUser({
          ...data.user,
          solverHistory: [],
          exerciseHistory: [],
        });
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Sign up failed.' };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const signOut = () => {
    clearAuthToken();
    setUser(null);
  };

  const addToSolverHistory = async (question: string, answer: string) => {
    if (!user) return;
    
    try {
      const response = await fetchWithAuth('/history/solver', {
        method: 'POST',
        body: JSON.stringify({ question, answer }),
      });
      
      const data = await response.json();
      
      if (data.success && data.entry) {
        // Update local state
        setUser(prev => {
          if (!prev) return prev;
          const newHistory = [data.entry, ...(prev.solverHistory || [])].slice(0, 50);
          return { ...prev, solverHistory: newHistory };
        });
      }
    } catch (error) {
      console.error('Error adding solver history:', error);
    }
  };

  const addToExerciseHistory = async (topic: string, difficulty: string, exercises: string) => {
    if (!user) return;
    
    try {
      const response = await fetchWithAuth('/history/exercise', {
        method: 'POST',
        body: JSON.stringify({ topic, difficulty, exercises }),
      });
      
      const data = await response.json();
      
      if (data.success && data.entry) {
        // Update local state
        setUser(prev => {
          if (!prev) return prev;
          const newHistory = [data.entry, ...(prev.exerciseHistory || [])].slice(0, 50);
          return { ...prev, exerciseHistory: newHistory };
        });
      }
    } catch (error) {
      console.error('Error adding exercise history:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        requestOtp,
        verifyOtp,
        signUp,
        signOut,
        addToSolverHistory,
        addToExerciseHistory,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
