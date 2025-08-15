import { create } from 'zustand';

type OwnerJoinState = {
  storeName: string;
  address: string;
  addressDetail: string;
  latitude: number | null;
  longitude: number | null;
  openingHours: string;
  closingHours: string;
  contact: string;
  category: string;
  selectedImageUri: string | null;
  uploadedImageUrl: string | null;
};

type OwnerJoinActions = {
  setStoreName: (storeName: string) => void;
  setAddress: (address: string) => void;
  setAddressDetail: (addressDetail: string) => void;
  setLatitude: (latitude: number | null) => void;
  setLongitude: (longitude: number | null) => void;
  setOpeningHours: (openingHours: string) => void;
  setClosingHours: (closingHours: string) => void;
  setContact: (contact: string) => void;
  setCategory: (category: string) => void;
  setSelectedImageUri: (uri: string | null) => void;
  setUploadedImageUrl: (url: string | null) => void;
  reset: () => void;
};

const initialState: OwnerJoinState = {
  storeName: '',
  address: '',
  addressDetail: '',
  latitude: null,
  longitude: null,
  openingHours: '',
  closingHours: '',
  contact: '',
  category: '',
  selectedImageUri: null,
  uploadedImageUrl: null,
};

const useOwnerJoinStore = create<OwnerJoinState & OwnerJoinActions>()((set) => ({
  ...initialState,
  setStoreName: (storeName) => set({ storeName }),
  setAddress: (address) => set({ address }),
  setAddressDetail: (addressDetail) => set({ addressDetail }),
  setLatitude: (latitude) => set({ latitude }),
  setLongitude: (longitude) => set({ longitude }),
  setOpeningHours: (openingHours) => set({ openingHours }),
  setClosingHours: (closingHours) => set({ closingHours }),
  setContact: (contact) => set({ contact }),
  setCategory: (category) => set({ category }),
  setSelectedImageUri: (uri) => set({ selectedImageUri: uri }),
  setUploadedImageUrl: (url) => set({ uploadedImageUrl: url }),
  reset: () => set(initialState),
}));

export default useOwnerJoinStore;
