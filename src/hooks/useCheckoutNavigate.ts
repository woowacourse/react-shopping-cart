import { useRecoilValue } from 'recoil';
import { totalProductQuantityState, totalAmountState } from '../store/selectors';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/routes';

const useCheckoutNavigate = () => {
  const navigate = useNavigate();
  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantityState);
  const totalAmount = useRecoilValue(totalAmountState);

  const handleCheckoutNavigate = () => {
    navigate(ROUTES.CHECKOUT, {
      state: {
        totalCount,
        totalQuantity,
        totalAmount,
      },
    });
  };

  return {
    handleCheckoutNavigate,
  };
};

export default useCheckoutNavigate;
