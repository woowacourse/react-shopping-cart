import Text from '../@common/Text/Text';

import {
  CouponModalListItemCheckboxStyle,
  CouponModalListItemDescriptionStyle,
  CouponModalListItemHeaderStyle,
  CouponModalListItemStyle,
} from './CouponModal.styles';
import { Coupon } from '../../types/coupon';

interface CouponListItemProps {
  coupon: Coupon;
  isSelected: boolean;
  onSelectCoupon: (couponCode: string) => void;
  isAvailable: boolean;
}

function CouponListItem({
  coupon,
  isSelected,
  onSelectCoupon,
  isAvailable,
}: CouponListItemProps) {
  const isShowMinimumAmount =
    coupon.code === 'FIXED5000' || coupon.code === 'FREESHIPPING';

  const isShowAvailableTime = coupon.code === 'MIRACLESALE';

  const getHourFromTime = (time: string = '00:00:00') => {
    const hour = time.split(':')[0].slice(1);

    return hour;
  };

  return (
    <li css={CouponModalListItemStyle(isAvailable)}>
      <div css={CouponModalListItemHeaderStyle}>
        <input
          type="checkbox"
          checked={isSelected}
          css={CouponModalListItemCheckboxStyle(isAvailable)}
          onChange={() => onSelectCoupon(coupon.code)}
          disabled={!isAvailable}
        />
        <Text varient="body">{coupon.description}</Text>
      </div>
      <div css={CouponModalListItemDescriptionStyle}>
        <Text varient="caption">만료일자: {coupon.expirationDate}</Text>
        {isShowMinimumAmount && (
          <Text varient="caption">
            최소 주문 금액: {coupon.minimumAmount?.toLocaleString()}원
          </Text>
        )}
        {isShowAvailableTime && (
          <Text varient="caption">
            {`사용 가능 시간: 오전 ${getHourFromTime(
              coupon.availableTime?.start
            )}시부터 ${getHourFromTime(coupon.availableTime?.end)}시까지`}
          </Text>
        )}
      </div>
    </li>
  );
}

export default CouponListItem;
