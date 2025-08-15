import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';

const useOwnerAuth = () => {
  const { roles, loginType, loadAuth } = useAuthStore();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [isPendingOwner, setIsPendingOwner] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      await loadAuth();
      setIsOwner(roles.includes('ROLE_OWNER'));
      setIsPendingOwner(roles.includes('ROLE_PENDING_OWNER'));
    };

    checkRole();
  }, [roles, loadAuth]);

  return { isOwner, isPendingOwner, loginType };
};

export default useOwnerAuth;
