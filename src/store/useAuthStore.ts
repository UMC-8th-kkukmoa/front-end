import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  roles: string[];
  loginType: 'kakao' | 'local' | null;
  setRoles: (roles: string[]) => void;
  setLoginType: (loginType: 'kakao' | 'local' | null) => void;
  clearAuth: () => void;
  loadAuth: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  roles: [],
  loginType: null,

  setRoles: (roles) => {
    set({ roles });
    AsyncStorage.setItem('roles', JSON.stringify(roles))
      .then(() => console.log('AsyncStorage에 roles 저장 완료:', roles))
      .catch(console.error);
  },

  setLoginType: (loginType) => {
    set({ loginType });
    if (loginType) {
      AsyncStorage.setItem('loginType', loginType).catch(console.error);
    } else {
      AsyncStorage.removeItem('loginType').catch(console.error);
    }
  },

  clearAuth: () => {
    set({ roles: [], loginType: null });
    AsyncStorage.removeItem('roles').catch(console.error);
    AsyncStorage.removeItem('loginType').catch(console.error);
  },

  loadAuth: async () => {
    try {
      const savedRoles = await AsyncStorage.getItem('roles');
      if (savedRoles) set({ roles: JSON.parse(savedRoles) });

      const savedLoginType = (await AsyncStorage.getItem('loginType')) as 'kakao' | 'local' | null;
      if (savedLoginType) set({ loginType: savedLoginType });
    } catch (error) {
      console.error('Failed to load auth data from storage:', error);
    }
  },
}));

export default useAuthStore;
