import { Coupon } from '../../types/coupon';
import Text from '../common/Text/Text';
import {
  CheckboxStyle,
  CouponItemDescriptionStyle,
  CouponItemHeaderStyle,
  CouponItemStyle,
} from './CouponItem.styles';

interface CouponItemProps {
  isChecked: boolean;
  onCheck: () => void;
  coupon: Coupon;
}

function CouponItem({ isChecked, onCheck, coupon }: CouponItemProps) {
  const { description, expirationDate } = coupon;
  const [year, month, day] = expirationDate.split('-');

  const secondLine = [];
  if (coupon.minimumAmount) {
    secondLine.push(
      `최소 주문 금액: ${coupon.minimumAmount.toLocaleString()}원`
    );
  } else if (coupon.availableTime) {
    const start = coupon.availableTime.start.slice(1, 2);
    const end = coupon.availableTime.end.slice(1, 2);

    secondLine.push(`사용 가능 시간: 오전 ${start}시부터 ${end}시까지`);
  }

  return (
    <div css={CouponItemStyle}>
      <div css={CouponItemHeaderStyle}>
        <input
          css={CheckboxStyle}
          type="checkbox"
          checked={isChecked}
          onChange={onCheck}
        />
        <Text varient="body" textAlign="left">
          {description}
        </Text>
      </div>
      <div css={CouponItemDescriptionStyle}>
        <Text varient="caption" textAlign="left">
          만료일: {year}년 {month}월 {day}일
        </Text>
        {secondLine.map((line, index) => (
          <Text key={index} varient="caption" textAlign="left">
            {line}
          </Text>
        ))}
      </div>
    </div>
  );
}

export default CouponItem;
