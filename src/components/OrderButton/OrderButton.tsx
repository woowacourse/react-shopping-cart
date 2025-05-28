import { useNavigate } from 'react-router';
import Text from '../common/Text/Text';
import { CartItemProps } from '../../types/cartItem';
import { ButtonStyle } from './OrderButton.styles';

function OrderButton({
  cartData,
  totalPrice,
}: {
  cartData: CartItemProps[];
  totalPrice: number;
}) {
  const navigate = useNavigate();
  const canOrderNow = cartData.length !== 0;

  return (
    <button
      css={ButtonStyle(canOrderNow)}
      disabled={!canOrderNow}
      onClick={() =>
        navigate('/order-check', { state: { cartData, totalPrice } })
      }
    >
      <Text varient="body">주문 확인</Text>
    </button>
  );
}

export default OrderButton;
