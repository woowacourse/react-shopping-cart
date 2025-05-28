import Text from '../common/Text/Text';
import { ButtonStyle } from './OrderButton.styles';

function OrderButton({ cartListLength }: { cartListLength: number }) {
  const canOrderNow = cartListLength !== 0;
  // const currentButtonStyle = canOrderNow ? ButtonStyle : ButtonStyle;

  return (
    <button
      css={ButtonStyle(canOrderNow)}
      disabled={!canOrderNow}
      onClick={() => console.log('click')}
    >
      <Text varient="body">주문 확인</Text>
    </button>
  );
}

export default OrderButton;
