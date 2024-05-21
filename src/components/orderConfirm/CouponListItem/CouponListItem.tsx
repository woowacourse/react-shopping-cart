import { Coupon } from '@appTypes/orderConfirm';
import CheckBox from '@components/common/Checkbox/Checkbox';

import * as Styled from './CouponListItem.styeld';

interface CouponListItemProps {
  coupon: Coupon;
}

const convertTime = (timeString: string) => {
  return timeString.split(':')[0];
};

const CouponListItem: React.FC<CouponListItemProps> = ({ coupon }) => {
  return (
    <Styled.CouponListItemWrapper key={coupon.id}>
      <Styled.CouponListItemHeader>
        <CheckBox checked />
        <Styled.CouponTitle>{coupon.description}</Styled.CouponTitle>
      </Styled.CouponListItemHeader>
      <Styled.CouponDescriptionWrapper>
        <Styled.CouponDescription>만료일:{coupon.expirationDate}</Styled.CouponDescription>
        {coupon?.minimumAmount && (
          <Styled.CouponDescription>최소 주문 금액:{coupon?.minimumAmount}</Styled.CouponDescription>
        )}
        {coupon?.availableTime && (
          <Styled.CouponDescription>
            사용 가능 시간: 오전 {convertTime(coupon?.availableTime.start)}시부터{' '}
            {convertTime(coupon?.availableTime.end)}시까지
          </Styled.CouponDescription>
        )}
      </Styled.CouponDescriptionWrapper>
    </Styled.CouponListItemWrapper>
  );
};

export default CouponListItem;
