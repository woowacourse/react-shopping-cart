import Text from '../@common/Text/Text';

import { CouponButtonStyle } from './CouponButton.styles';

function CouponButton({ onClick }: { onClick: () => void }) {
  return (
    <button css={CouponButtonStyle} onClick={onClick}>
      <Text variant="caption">쿠폰 적용</Text>
    </button>
  );
}

export default CouponButton;
