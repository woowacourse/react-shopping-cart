import Text from '../common/Text/Text';
import { ButtonStyle } from './OrderButton.styles';

function OrderButton() {
  return (
    <button css={ButtonStyle}>
      <Text varient="body">주문 확인</Text>
    </button>
  );
}

export default OrderButton;
