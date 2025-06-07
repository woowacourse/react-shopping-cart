import { useNavigate } from "react-router-dom";

export const useNavigation = (isDisabled: boolean) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    if (!isDisabled) {
      navigate('/order-confirm');
    }
  };

  return {
    handleBackClick,
    handleCheckout,
  };
};
