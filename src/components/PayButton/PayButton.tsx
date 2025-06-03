import { TEXT } from '../../constants/text';
import Text from '../common/Text/Text';
import { ButtonStyle } from './PayButton.styles';

function PayButton() {
  return (
    <button css={ButtonStyle} disabled={true}>
      <Text varient="body">{TEXT.PAY}</Text>
    </button>
  );
}

export default PayButton;
