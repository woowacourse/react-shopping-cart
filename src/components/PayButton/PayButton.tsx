import Text from '../common/Text/Text';
import { ButtonStyle } from './PayButton.styles';

function PayButton() {
  return (
    <button css={ButtonStyle} disabled={true}>
      <Text varient="body">결제하기</Text>
    </button>
  );
}

export default PayButton;
