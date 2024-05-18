import Button from '@/components/common/Button';
import useCheckoutNavigate from '@/hooks/useCheckoutNavigate';
import { allCartItemStates } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

export default function OrderButton() {
  const { handleOrderButton } = useCheckoutNavigate();
  const cartItems = useRecoilValue(allCartItemStates);

  return (
    <Button onClick={handleOrderButton} variant="footer" disabled={cartItems.length === 0}>
      주문 하기
    </Button>
  );
}
