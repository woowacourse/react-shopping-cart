import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@/constants/routes';

const useCartNavigate = () => {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate(PAGE_ROUTES.CART);
  };

  return { handleHomeButtonClick };
};

export default useCartNavigate;
