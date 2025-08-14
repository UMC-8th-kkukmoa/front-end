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

  setRoles: (roles) => {
    set({ roles });
    AsyncStorage.setItem('roles', JSON.stringify(roles))
      .then(() => console.log('AsyncStorage에 roles 저장 완료:', roles))
      .catch(console.error);
  },

  clearRoles: () => {
    set({ roles: [] });
    AsyncStorage.removeItem('roles').catch(console.error);
  },

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
