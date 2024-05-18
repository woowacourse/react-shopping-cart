import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/routes';

const useCartNavigate = () => {
  const navigate = useNavigate();

  const navigateCartPage = () => {
    navigate(ROUTES.CART);
  };

  return { navigateCartPage };
};

export default useCartNavigate;
