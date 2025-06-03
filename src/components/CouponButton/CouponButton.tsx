import Text from '../@common/Text/Text';

import { CouponButtonStyle } from './CouponButton.styles';

function CouponButton() {
  return (
    <button css={CouponButtonStyle}>
      <Text varient="caption">쿠폰 적용</Text>
    </button>
  );
}

export default CouponButton;
