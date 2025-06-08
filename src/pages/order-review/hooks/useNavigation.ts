import { useNavigate } from 'react-router-dom';

export const useNavigation = (isDisabled: boolean, payment: number) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    if (!isDisabled) {
      navigate('/order-confirm', {
        state: { payment },
      });
    }
  };

  return {
    handleBackClick,
    handleCheckout,
  };
};
