import { TEXT } from '../../constants/text';
import Text from '../common/Text/Text';
import CouponButtonStyle from './CouponButton.styles';

interface CouponButtonProps {
  onClick: () => void;
}

function CouponButton({ onClick }: CouponButtonProps) {
  return (
    <button css={CouponButtonStyle} onClick={onClick}>
      <Text varient="body" textAlign="center">
        {TEXT.COUPON}
      </Text>
    </button>
  );
}

export default CouponButton;
