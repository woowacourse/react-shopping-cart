import { useRecoilValue } from 'recoil';
import { totalProductQuantity, totalOrderAmountState } from '../store/selectors';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/routes';

const usePaymentsNavigate = () => {
  const navigate = useNavigate();
  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantity);
  const { totalAmount } = useRecoilValue(totalOrderAmountState);

  const handleFooterButtonClick = () => {
    navigate(ROUTES.CHECK_OUT, {
      state: {
        totalCount,
        totalQuantity,
        totalAmount,
      },
    });
  };

  return {
    handleFooterButtonClick,
  };
};

export default usePaymentsNavigate;
