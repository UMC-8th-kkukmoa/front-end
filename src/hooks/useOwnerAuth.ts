import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';

const useOwnerAuth = () => {
  const { roles, loadRoles } = useAuthStore();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [isPendingOwner, setIsPendingOwner] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      await loadRoles();
      setIsOwner(roles.includes('ROLE_OWNER'));
      setIsPendingOwner(roles.includes('ROLE_PENDING_OWNER'));
    };

    checkRole();
  }, [roles, loadRoles]);

  return { isOwner, isPendingOwner };
};

export default useOwnerAuth;
