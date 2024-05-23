import { Coupon } from '@appTypes/orderConfirm';
import CheckBox from '@components/common/Checkbox/Checkbox';

import * as Styled from './CouponListItem.styled';

interface CouponListItemProps {
  coupon: Coupon;
  isChecked: boolean;
  isActive: boolean;
  onAddTemporarySelectedCouponList: (checked: boolean, coupon: Coupon) => void;
}

const convertTime = (timeString: string) => {
  return timeString.split(':')[0];
};

const CouponListItem: React.FC<CouponListItemProps> = ({
  coupon,
  isChecked,
  isActive,
  onAddTemporarySelectedCouponList,
}) => {
  return (
    <Styled.CouponListItemWrapper key={coupon.id}>
      <Styled.CouponListItemHeader>
        <CheckBox
          disabled={!isActive}
          checked={isChecked && isActive}
          onChange={(event) => {
            onAddTemporarySelectedCouponList(event.target.checked, coupon);
          }}
        />
        <Styled.CouponTitle $isActive={isActive}>{coupon.description}</Styled.CouponTitle>
      </Styled.CouponListItemHeader>
      <Styled.CouponDescriptionWrapper>
        <Styled.CouponDescription $isActive={isActive}>만료일:{coupon.expirationDate}</Styled.CouponDescription>
        {coupon?.minimumAmount && (
          <Styled.CouponDescription $isActive={isActive}>
            최소 주문 금액:{coupon?.minimumAmount}
          </Styled.CouponDescription>
        )}
        {coupon?.availableTime && (
          <Styled.CouponDescription $isActive={isActive}>
            사용 가능 시간: 오전 {convertTime(coupon?.availableTime.start)}시부터{' '}
            {convertTime(coupon?.availableTime.end)}시까지
          </Styled.CouponDescription>
        )}
      </Styled.CouponDescriptionWrapper>
    </Styled.CouponListItemWrapper>
  );
};

export default CouponListItem;
