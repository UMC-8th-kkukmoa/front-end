import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccessToken, getRefreshToken } from '../utils/tokenStorage';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  roles: string[];
  loginType: 'kakao' | 'local' | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  setRoles: (roles: string[]) => void;
  setLoginType: (loginType: 'kakao' | 'local' | null) => void;
  clearAuth: () => void;
  loadAuth: () => Promise<void>;
  updateTokens: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set, get) => ({
  roles: [],
  loginType: null,
  tokens: null,
  isAuthenticated: false,

  setRoles: (roles) => {
    set({ roles });
    AsyncStorage.setItem('roles', JSON.stringify(roles))
      .then(() => console.log('AsyncStorage에 roles 저장 완료:', roles))
      .catch(console.error);
  },

  setLoginType: (loginType) => {
    set({ loginType });
    const { tokens } = get();
    const isAuthenticated = !!(tokens?.accessToken && loginType);
    set({ isAuthenticated }); // 이 줄이 빠져있었어요

    if (loginType) {
      AsyncStorage.setItem('loginType', loginType).catch(console.error);
    } else {
      AsyncStorage.removeItem('loginType').catch(console.error);
    }
  },

  updateTokens: async () => {
    try {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();
      const { loginType } = get();

      if (accessToken && refreshToken) {
        set({
          tokens: { accessToken, refreshToken },
          isAuthenticated: !!loginType,
        });
      } else {
        set({ tokens: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Failed to update tokens:', error);
      set({ tokens: null, isAuthenticated: false });
    }
  },

  clearAuth: () => {
    set({
      roles: [],
      loginType: null,
      tokens: null,
      isAuthenticated: false,
    });
    AsyncStorage.removeItem('roles').catch(console.error);
    AsyncStorage.removeItem('loginType').catch(console.error);
  },

  loadAuth: async () => {
    try {
      const savedRoles = await AsyncStorage.getItem('roles');
      if (savedRoles) set({ roles: JSON.parse(savedRoles) });

      const savedLoginType = (await AsyncStorage.getItem('loginType')) as 'kakao' | 'local' | null;
      if (savedLoginType) set({ loginType: savedLoginType });

      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();
      console.log('Loaded tokens:', { accessToken, refreshToken });

      const isAuthenticated = !!(accessToken && refreshToken && savedLoginType);

      if (accessToken && refreshToken) {
        set({
          tokens: { accessToken, refreshToken },
          isAuthenticated,
        });
      } else {
        set({
          tokens: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Failed to load auth data from storage:', error);
      set({ isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
