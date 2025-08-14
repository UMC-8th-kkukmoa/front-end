import { create } from 'zustand';

interface AuthState {
  roles: string[];
  setRoles: (roles: string[]) => void;
  clearRoles: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  roles: [],
  setRoles: (roles) => set({ roles }),
  clearRoles: () => set({ roles: [] }),
}));

export default useAuthStore;
