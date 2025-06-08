import styled from '@emotion/styled';
import { Coupon } from '../../types';
import ExpirationDate from './info/ExpirationDate';
import MinimumAmount from './info/MinimumAmount';
import AvailableTime from './info/AvailableTime';
import CheckBox from '../CheckBox';

type CouponCardProps = {
  coupon: Coupon;
  isSelected: boolean;
  isValid: boolean;
  onClick: () => void;
};
export const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2025-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2025-06-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2025-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2025-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  },
];

const CouponNameMap: Record<string, string> = {
  FIXED5000: '5,000원 할인 쿠폰',
  BOGO: '2개 구매 시 1개 무료 쿠폰',
  FREESHIPPING: '5만원 이상 구매 시 무료 배송 쿠폰',
  MIRACLESALE: '미라클모닝 30% 할인 쿠폰',
};

const CouponCard = ({
  coupon,
  isSelected,
  isValid = true,
  onClick,
}: CouponCardProps) => {
  return (
    <S.container onClick={onClick} isValid={isValid}>
      <S.couponNameContainer>
        <CheckBox isChecked={isSelected} />
        <S.couponName>{CouponNameMap[coupon.code]}</S.couponName>
      </S.couponNameContainer>
      <div>
        <ExpirationDate expirationDate={coupon.expirationDate} />
        {coupon.minimumAmount && (
          <MinimumAmount minimumAmount={Number(coupon.minimumAmount)} />
        )}
        {coupon.availableTime && (
          <AvailableTime availableTime={coupon.availableTime} />
        )}
      </div>
    </S.container>
  );
};

type containerProps = {
  isValid: boolean;
};

const S = {
  container: styled.div<containerProps>`
    color: ${(props) => (props.isValid ? '#000000' : '#b1b1b1')};
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 8px;
  `,
  couponNameContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  couponName: styled.div`
    font-size: 16px;
    font-weight: 700;
  `,
};

export default CouponCard;
