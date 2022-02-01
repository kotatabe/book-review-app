import {
  useContext,
} from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { AlertStatContext } from '../Context/AlertStatContext';

const useProfile = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { status, setStatus } = useContext(AlertStatContext);

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setStatus({
      ...status, severity: 'success', open: true, message: 'ログアウトしました'
    });
    navigate('/login');
  };

  const profile = () => {
    navigate('/profile');
  }

  return { logout, profile };
}

export default useProfile;
