import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/portal';
import { PortalService } from '../services/portalService';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  switchUser: (user: UserProfile) => Promise<void>;
  refreshCurrentUser: () => Promise<void>;
  isAdmin: boolean;
  isWorker: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = PortalService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<UserProfile> => {
    setLoading(true);
    try {
      const profile = await PortalService.login(email, pass);
      setCurrentUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await PortalService.logout();
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const switchUser = async (targetUser: UserProfile): Promise<void> => {
    localStorage.setItem('rumuli_portal_current_user', JSON.stringify(targetUser));
    setCurrentUser(targetUser);
    await PortalService.logActivity(
      targetUser.uid,
      targetUser.name,
      'Switched Session Profile',
      `Active session switched to ${targetUser.name} (${targetUser.role}).`,
      'AUTH'
    );
  };

  const refreshCurrentUser = async (): Promise<void> => {
    const user = PortalService.getCurrentUser();
    setCurrentUser(user);
  };

  const isAdmin = currentUser?.role === 'ADMIN';
  const isWorker = currentUser?.role === 'WORKER';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        logout,
        switchUser,
        refreshCurrentUser,
        isAdmin,
        isWorker
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

