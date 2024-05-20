import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/routes';

const useCartNavigate = () => {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate(ROUTES.CART);
  };

  return { handleHomeButtonClick };
};

export default useCartNavigate;
