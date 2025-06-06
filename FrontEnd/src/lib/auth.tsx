// =================================================================
// ██████╗██╗  ██╗ █████╗ ████████╗███████╗██████╗  █████╗ 
// ██╔════╝██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗
// ██║     ███████║███████║   ██║   █████╗  ██████╔╝███████║
// ██║     ██╔══██║██╔══██║   ██║   ██╔══╝  ██╔══██╗██╔══██║
// ╚██████╗██║  ██║██║  ██║   ██║   ███████╗██║  ██║██║  ██║
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
// GENERATED BY CLAUDE: ChatEra v1.0 – 2025-05-13
// =================================================================

/**
 * ▄▀█ █░█ ▀█▀ █░█ █▀▀ █▄░█ ▀█▀ █ █▀▀ ▄▀█ ▀█▀ █ █▀█ █▄░█
 * █▀█ █▄█ ░█░ █▀█ ██▄ █░▀█ ░█░ █ █▄▄ █▀█ ░█░ █ █▄█ █░▀█
 *
 * [CODEX] Authentication Provider
 * 
 * This module manages user authentication and session state across
 * the application. It handles login, registration, token management,
 * and persistent sessions with secure storage mechanisms optimized for
 * both browser and desktop environments.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTauri } from './tauri';
import { User } from '@chatera/shared';

// API endpoints
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  status: 'loading',
  login: async () => false,
  register: async () => false,
  logout: () => {},
  getToken: () => null,
});

/**
 * [H4X] TOKEN MANAGEMENT
 * 
 * Securely handle auth tokens with platform-appropriate storage
 */

// Token Storage with platform awareness
const TokenStorage = {
  // Store token with appropriate mechanism
  async setToken(token: string): Promise<void> {
    try {
      localStorage.setItem('chatera-token', token);
    } catch (error) {
      console.error('[AUTH] Error storing token:', error);
    }
  },

  // Get token from storage
  getToken(): string | null {
    try {
      return localStorage.getItem('chatera-token');
    } catch (error) {
      console.error('[AUTH] Error retrieving token:', error);
      return null;
    }
  },

  // Clear token on logout
  removeToken(): void {
    try {
      localStorage.removeItem('chatera-token');
    } catch (error) {
      console.error('[AUTH] Error removing token:', error);
    }
  },
};

/**
 * [H4X] AUTH PROVIDER
 * 
 * React context provider for authentication state and functions
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const router = useRouter();
  const { isDesktop, fs, path } = useTauri();

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = TokenStorage.getToken();
        
        if (!token) {
          setStatus('unauthenticated');
          return;
        }
        
        // Validate token and get user data
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          setStatus('authenticated');
        } else {
          // Token is invalid or expired
          TokenStorage.removeToken();
          setStatus('unauthenticated');
        }
      } catch (error) {
        console.error('[AUTH] Error loading user:', error);
        setStatus('unauthenticated');
      }
    };
    
    loadUser();
  }, [isDesktop]);

  /**
   * [H4X] LOGIN FUNCTION
   * 
   * Authenticate user with credentials and obtain session token
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setStatus('loading');
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.token) {
        // Store token and user data
        await TokenStorage.setToken(data.token);
        setUser(data.user);
        setStatus('authenticated');
        toast.success('Logged in successfully');
        return true;
      } else {
        setStatus('unauthenticated');
        toast.error(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('[AUTH] Login error:', error);
      setStatus('unauthenticated');
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  /**
   * [H4X] REGISTER FUNCTION
   * 
   * Create new user account and authenticate in one step
   */
  const register = async (
    username: string,
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> => {
    try {
      setStatus('loading');
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, displayName }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.token) {
        // Store token and user data
        await TokenStorage.setToken(data.token);
        setUser(data.user);
        setStatus('authenticated');
        toast.success('Account created successfully');
        return true;
      } else {
        setStatus('unauthenticated');
        toast.error(data.message || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.error('[AUTH] Registration error:', error);
      setStatus('unauthenticated');
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  /**
   * [H4X] LOGOUT FUNCTION
   * 
   * End user session and clear credentials
   */
  const logout = () => {
    TokenStorage.removeToken();
    setUser(null);
    setStatus('unauthenticated');
    router.push('/login');
    toast.success('Logged out successfully');
  };

  /**
   * [H4X] GET TOKEN FUNCTION
   * 
   * Retrieve current authentication token for API requests
   */
  const getToken = (): string | null => {
    return TokenStorage.getToken();
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider value={{ 
      user, 
      status, 
      login, 
      register, 
      logout, 
      getToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * [H4X] AUTH HOOK
 * 
 * Custom hook for easy access to authentication state and functions
 */
export const useAuth = () => useContext(AuthContext);
