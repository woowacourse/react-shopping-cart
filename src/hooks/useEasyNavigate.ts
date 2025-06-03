import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../constants/systemConstants';

const useEasyNavigate = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(ROUTE.HOME);
  };

  const goOrderComplete = (
    productTypeCount: number,
    totalPrice: number,
    totalProductCount: number
  ) => {
    navigate(ROUTE.ORDER_COMPLETE, {
      state: { productTypeCount, totalPrice, totalProductCount },
    });
  };

  return { goHome, goOrderComplete };
};

export default useEasyNavigate;
