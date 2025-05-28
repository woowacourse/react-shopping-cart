import { useNavigate } from 'react-router-dom';

const useEasyNavigate = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goOrderComplete = (
    productTypeCount: number,
    totalPrice: number,
    totalProductCount: number
  ) => {
    navigate('/order-complete', {
      state: { productTypeCount, totalPrice, totalProductCount },
    });
  };

  return { goHome, goOrderComplete };
};

export default useEasyNavigate;
