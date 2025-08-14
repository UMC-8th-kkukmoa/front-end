import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  roles: string[];
  setRoles: (roles: string[]) => void;
  clearRoles: () => void;
  loadRoles: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  roles: [],

  // roles 저장 + AsyncStorage 동기화
  setRoles: (roles) => {
    set({ roles });
    AsyncStorage.setItem('roles', JSON.stringify(roles)).catch(console.error);
  },

  // 초기화
  clearRoles: () => {
    set({ roles: [] });
    AsyncStorage.removeItem('roles').catch(console.error);
  },

  // 앱 시작 시 복원
  loadRoles: async () => {
    try {
      const saved = await AsyncStorage.getItem('roles');
      if (saved) set({ roles: JSON.parse(saved) });
    } catch (error) {
      console.error('Failed to load roles from storage:', error);
    }
  },
}));

export default useAuthStore;
