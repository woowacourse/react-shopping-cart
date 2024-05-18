import { useRecoilValue } from 'recoil';
import { totalOrderAmount, totalCategoryCount, totalOrderQuantity } from '@/store/selectors';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/routes';

const useCheckoutNavigate = () => {
  const navigate = useNavigate();
  const totalOrderQuantityValue = useRecoilValue(totalOrderQuantity);
  const totalCategoryCountValue = useRecoilValue(totalCategoryCount);
  const totalOrderAmountValue = useRecoilValue(totalOrderAmount);

  const handleFooterButtonClick = () => {
    navigate(ROUTES.CHECK_OUT, {
      state: {
        totalCount: totalCategoryCountValue,
        totalQuantity: totalOrderQuantityValue,
        totalOrderAmount: totalOrderAmountValue,
      },
    });
  };

  return {
    handleFooterButtonClick,
  };
};

export default useCheckoutNavigate;
