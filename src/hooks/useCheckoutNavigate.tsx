import { useRecoilValue } from 'recoil';
import { totalOrderAmount, totalCategoryCount, totalOrderQuantity } from '@/store/selectors';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@/constants/routes';

const MIN_ORDER_QUANTITY = 1;

const useCheckoutNavigate = () => {
  const navigate = useNavigate();
  const totalOrderQuantityValue = useRecoilValue(totalOrderQuantity);
  const totalCategoryCountValue = useRecoilValue(totalCategoryCount);
  const totalOrderAmountValue = useRecoilValue(totalOrderAmount);

  const handleOrderButton = () => {
    if (totalOrderQuantityValue > MIN_ORDER_QUANTITY) {
      navigate(PAGE_ROUTES.CHECK_OUT, {
        state: {
          totalCount: totalCategoryCountValue,
          totalQuantity: totalOrderQuantityValue,
          totalOrderAmount: totalOrderAmountValue,
        },
      });
    }
  };

  return {
    handleOrderButton,
  };
};

export default useCheckoutNavigate;
