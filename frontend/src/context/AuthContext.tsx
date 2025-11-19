import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

export type AuthUser = {
  _id: string;
  username: string;
  email: string;
  role: 'Admin' | 'Member' | 'Guest' | string;
  plan: 'Free' | 'Basic' | 'Pro' | string;
  profile?: {
    avatar?: string;
    bio?: string;
  };
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { username: string; email: string; password: string }) => Promise<void>;
  forgot: (email: string, newPassword: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateUserLocally: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'pre_setup_auth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached).user : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached).token : null;
  });
  const [loading, setLoading] = useState<boolean>(!!token);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    refreshProfile();
  }, [token]);

  const persist = (nextUser: AuthUser, nextToken: string) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    persist(response.user, response.token);
  };

  const register = async (payload: { username: string; email: string; password: string }) => {
    const response = await authService.register(payload);
    persist(response.user, response.token);
  };

  const forgot = async (email: string, newPassword: string) => {
    await authService.forgotPassword({ email, newPassword });
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await authService.me();
      if (response.user) {
        setUser(response.user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: response.user, token }));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUserLocally = (nextUser: AuthUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token }));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      forgot,
      logout,
      refreshProfile,
      updateUserLocally,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };

