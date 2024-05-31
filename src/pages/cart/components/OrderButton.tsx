import Button from '@/components/common/Button';
import { PAGE_ROUTES } from '@/constants/routes';
import { useCartManager } from '@/store/custom/useCartManager';
import { useNavigate } from 'react-router-dom';

const MIN_ORDER_QUANTITY = 1;

export default function OrderButton() {
  const navigate = useNavigate();
  const { totalCartItems, totalCategoryCount, totalOrderQuantity, orderAmount, totalOrderAmount } =
    useCartManager();

  const handleOrderButton = () => {
    if (totalOrderQuantity >= MIN_ORDER_QUANTITY) {
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
