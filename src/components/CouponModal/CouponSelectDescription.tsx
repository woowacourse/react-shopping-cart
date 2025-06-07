import Text from '../@common/Text/Text';

import { Info } from '../../assets';
import { CouponSelectDescriptionStyle } from './CouponModal.styles';

function CouponSelectDescription({ children }: { children: React.ReactNode }) {
  return (
    <div css={CouponSelectDescriptionStyle}>
      <img src={Info} alt="coupon-info" />
      <Text varient="caption">{children}</Text>
    </div>
  );
}

export default CouponSelectDescription;
