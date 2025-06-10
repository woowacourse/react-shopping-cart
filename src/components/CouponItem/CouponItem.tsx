import { Coupon } from '../../types/coupon';
import { getCouponAdditionalConditions } from '../../utils/couponFormat';
import Text from '../common/Text/Text';
import {
  CheckboxStyle,
  CouponItemDescriptionStyle,
  CouponItemHeaderStyle,
  CouponItemStyle,
} from './CouponItem.styles';

interface CouponItemProps {
  isChecked: boolean;
  onCheck: (id: number) => void;
  coupon: Coupon;
  isDisabled: boolean;
}

function CouponItem({
  isChecked,
  onCheck,
  coupon,
  isDisabled,
}: CouponItemProps) {
  const { description, expirationDate } = coupon;

  const [year, month, day] = expirationDate.split('-');

  const additionalCouponConditions = getCouponAdditionalConditions(coupon);

  return (
    <div css={CouponItemStyle(isDisabled)}>
      <div css={CouponItemHeaderStyle}>
        <input
          css={CheckboxStyle}
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(coupon.id)}
          disabled={isDisabled}
        />
        <Text varient="body" textAlign="left">
          {description}
        </Text>
      </div>
      <div css={CouponItemDescriptionStyle}>
        <Text varient="caption" textAlign="left">
          만료일: {year}년 {month}월 {day}일
        </Text>
        {additionalCouponConditions.map((line, index) => (
          <Text key={index} varient="caption" textAlign="left">
            {line}
          </Text>
        ))}
      </div>
    </div>
  );
}

export default CouponItem;
