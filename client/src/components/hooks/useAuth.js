// hooks/useAuth.js
import { useUser } from '../../context/UserContext';

const useAuth = () => {
  const { currentUser, isAuthenticated } = useUser();
  return { currentUser, isAuthenticated };
};

export default useAuth;
