import { TEXT } from '../../constants/text';
import Text from '../common/Text/Text';
import { ButtonStyle } from './OrderButton.styles';

interface OrderButtonProps {
  onClick: () => void;
  canOrder: boolean;
}

function OrderButton({ onClick, canOrder }: OrderButtonProps) {
  return (
    <button css={ButtonStyle(canOrder)} disabled={!canOrder} onClick={onClick}>
      <Text varient="body">{TEXT.ORDER_CHECK}</Text>
    </button>
  );
}

export default OrderButton;
