import Button from '@/components/common/Button';
import useCheckoutNavigate from '@/hooks/useCheckoutNavigate';
import { orderAmount } from '@/store/selectors';
import { useRecoilValue } from 'recoil';

export default function OrderButton() {
  const { handleOrderButton } = useCheckoutNavigate();
  const orderAmountValue = useRecoilValue(orderAmount);

  return (
    <Button onClick={handleOrderButton} variant="footer" disabled={!orderAmountValue}>
      주문 하기
    </Button>
  );
}
