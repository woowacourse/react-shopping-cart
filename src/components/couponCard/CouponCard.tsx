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
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    onClick();
  };
  return (
    <S.container onClick={handleClick} isValid={isValid}>
      <S.couponNameContainer>
        <CheckBox isChecked={isSelected} disabled={!isValid} />
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
