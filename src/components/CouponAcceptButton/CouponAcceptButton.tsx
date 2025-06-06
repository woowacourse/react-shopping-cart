import Text from '../common/Text/Text';
import { CouponAcceptButtonStyle } from './CouponAcceptButton.styles';

interface CouponButtonProps {
  onClick: () => void;
}

function CouponAcceptButton({ onClick }: CouponButtonProps) {
  return (
    <button css={CouponAcceptButtonStyle} onClick={onClick}>
      <Text varient="body" textAlign="center">
        {`총 [10,000]원 할인 쿠폰 사용하기`}
      </Text>
    </button>
  );
}

export default CouponAcceptButton;
