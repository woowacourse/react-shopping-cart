import Text from '../common/Text/Text';
import { ButtonStyle } from './OrderButton.styles';

interface OrderButtonProps {
  onClick: () => void;
  canOrder: boolean;
}

function OrderButton({ onClick, canOrder }: OrderButtonProps) {
  return (
    <button css={ButtonStyle(canOrder)} disabled={!canOrder} onClick={onClick}>
      <Text varient="body">주문 확인</Text>
    </button>
  );
}

export default OrderButton;
