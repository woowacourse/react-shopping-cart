import Button from '@/components/common/Button';
import { PAGE_ROUTES } from '@/constants/routes';
import {
  orderAmountSelector,
  totalCategoryCountSelector,
  totalOrderAmountSelector,
  totalOrderQuantitySelector,
  totalCartItemsSelector,
} from '@/store/selectors';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const MIN_ORDER_QUANTITY = 1;

export default function OrderButton() {
  const navigate = useNavigate();
  const totalOrderQuantity = useRecoilValue(totalOrderQuantitySelector);
  const totalCategoryCount = useRecoilValue(totalCategoryCountSelector);
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const orderAmount = useRecoilValue(orderAmountSelector);
  const totalCartItems = useRecoilValue(totalCartItemsSelector);

  const handleOrderButton = () => {
    if (totalOrderQuantity > MIN_ORDER_QUANTITY) {
      navigate(PAGE_ROUTES.ORDER_CONFIRM, {
        state: {
          totalCategoryCount,
          totalOrderQuantity,
          totalOrderAmount,
          totalCartItems,
        },
      });
    }
  };

  return (
    <Button onClick={handleOrderButton} variant="footer" disabled={!orderAmount}>
      주문 확인
    </Button>
  );
}
