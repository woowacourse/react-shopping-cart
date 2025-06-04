import { TEXT } from '../../constants/text';
import Text from '../common/Text/Text';
import CouponButtonStyle from './CouponButton.styles';

// interface CouponButtonProps {
//   onClick: () => void;
//   canOrder: boolean;
// }

function CouponButton() {
  return (
    <button css={CouponButtonStyle}>
      <Text varient="body" textAlign="center">
        {TEXT.COUPON}
      </Text>
    </button>
  );
}

export default CouponButton;
