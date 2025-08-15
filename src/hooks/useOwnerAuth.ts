import { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';

const useOwnerAuth = () => {
  const { roles = [], loginType, loadAuth } = useAuthStore();

  useEffect(() => {
    loadAuth().catch(console.error);
  }, [roles, loadAuth]);

  const isOwner = roles.includes('ROLE_OWNER');
  const isPendingOwner = roles.includes('ROLE_PENDING_OWNER');

  return { isOwner, isPendingOwner, loginType };
};

export default useOwnerAuth;
