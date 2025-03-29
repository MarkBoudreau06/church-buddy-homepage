
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock profile data for demonstration
export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  role: string;
  avatarUrl: string | null;
  phoneNumber: string;
  birthday: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  login: () => void;
  logout: () => void;
  updateProfile: (updatedProfile: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  name: "John Smith",
  email: "john.smith@example.com",
  memberSince: "January 2019",
  role: "Volunteer",
  avatarUrl: null,
  phoneNumber: "(555) 123-4567",
  birthday: "April 15"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check for saved login state on component mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    if (savedLoginState === 'true') {
      setIsLoggedIn(true);
      
      // Get saved profile or use default
      const savedProfile = localStorage.getItem('userProfile');
      setUserProfile(savedProfile ? JSON.parse(savedProfile) : defaultProfile);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setUserProfile(defaultProfile);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  };

  const updateProfile = (updatedProfile: Partial<UserProfile>) => {
    if (userProfile) {
      const newProfile = { ...userProfile, ...updatedProfile };
      setUserProfile(newProfile);
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userProfile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
