import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';

const useOwnerAuth = () => {
  const { roles, loadRoles } = useAuthStore();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      await loadRoles();
      if (roles.includes('ROLE_OWNER')) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    };

    checkRole();
  }, [roles, loadRoles]);

  return { isOwner };
};

export default useOwnerAuth;
