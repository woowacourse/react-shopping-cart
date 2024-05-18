import Button from '@/components/common/Button';
import useCheckoutNavigate from '@/hooks/useCheckoutNavigate';
import { allCartItemStates } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

export default function OrderButton() {
  const { handleFooterButtonClick } = useCheckoutNavigate();
  const cartItems = useRecoilValue(allCartItemStates);

  return (
    <Button onClick={handleFooterButtonClick} variant="footer" disabled={cartItems.length === 0}>
      주문 하기
    </Button>
  );
}
