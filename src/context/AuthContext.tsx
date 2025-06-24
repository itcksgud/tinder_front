import React, {
  createContext, useState, useEffect,
  useContext, useCallback, ReactNode
} from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../api';

type User = {
  id: string;
  email: string;
  username: string;
  isVerified: boolean;
  firstName?: string;
  lastName?: string;
  birthDate?: string;                        // ISO 문자열
  gender?: 'male' | 'female' | 'other';
  location?: { type: 'Point'; coordinates: [number, number] };
  photos?: string[];                          // Mongoose 스키마의 photos 배열
  bio?: string;
  interests?: string[];
};

type AuthState = {
  accessToken: string;
  user: User;
};

type AuthContextType = {
  auth: AuthState | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        try {
          const res = await api.get('/auth/me');
          const user: User = res.data.user;
          setAuth({ accessToken, user });
        } catch {
          if (refreshToken) {
            const r = await api.post('/auth/refresh-token', { token: refreshToken });
            const newAT = r.data.accessToken;
            await SecureStore.setItemAsync('accessToken', newAT);
            api.defaults.headers.common['Authorization'] = `Bearer ${newAT}`;
            const me = await api.get('/auth/me');
            setAuth({ accessToken: newAT, user: me.data.user });
          }
        }
      }

      setLoading(false);
    };
    initAuth();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { accessToken, refreshToken, user } = res.data;

    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);

    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setAuth({ accessToken, user });
  }, []);

  const signOut = useCallback(async () => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (refreshToken) {
      await api.post('/auth/logout', { token: refreshToken }).catch(() => {});
    }
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');

    delete api.defaults.headers.common['Authorization'];
    setAuth(null);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be inside AuthProvider');
  }
  return ctx;
};
