import { useNavigate } from 'react-router';
import Text from '../common/Text/Text';
import { CartItemProps } from '../../types/cartItem';
import { ButtonStyle } from './OrderButton.styles';

function OrderButton({
  selectedCartData,
  totalPrice,
}: {
  selectedCartData: CartItemProps[];
  totalPrice: number;
}) {
  const navigate = useNavigate();
  const canOrderNow = selectedCartData.length !== 0;

  return (
    <button
      css={ButtonStyle(canOrderNow)}
      disabled={!canOrderNow}
      onClick={() =>
        navigate('/order-check', { state: { selectedCartData, totalPrice } })
      }
    >
      <Text varient="body">주문 확인</Text>
    </button>
  );
}

export default OrderButton;
