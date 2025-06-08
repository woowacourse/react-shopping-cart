import styled from '@emotion/styled';
import { Coupon } from '../types';
import CheckBox from './CheckBox';
import useCouponActions from '../hooks/useCouponActions';
import { useToastContext } from '../contexts/ToastContext';

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard = ({ coupon }: CouponCardProps) => {
  const [year, month, day] = coupon.expirationDate.split('-').map(Number);
  const { isChecked, isEnable, handleCheckBoxClick } = useCouponActions(coupon.id);
  const { showToast } = useToastContext();

  return (
    <>
      {isEnable ? (
        <S.Container data-testid="coupon-card">
          <S.TitleContainer>
            <CheckBox checked={isChecked} onChange={handleCheckBoxClick} />
            <p>{coupon.description}</p>
          </S.TitleContainer>
          <S.Content>
            {coupon.expirationDate && (
              <p>
                만료일: {year}년 {month}월 {day}일
              </p>
            )}
            {coupon.minimumAmount && (
              <p>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원</p>
            )}
            {coupon.availableTime && (
              <p>
                사용 가능 시간: {coupon.availableTime.start}부터 {coupon.availableTime.end}까지
              </p>
            )}
          </S.Content>
        </S.Container>
      ) : (
        <S.DisabledContainer data-testid="coupon-card">
          <S.TitleContainer>
            <CheckBox onChange={() => showToast('만료된 쿠폰입니다.')} />
            <p>{coupon.description}</p>
          </S.TitleContainer>
          <S.Content>
            {coupon.expirationDate && (
              <p>
                만료일: {year}년 {month}월 {day}일
              </p>
            )}
            {coupon.minimumAmount && (
              <p>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원</p>
            )}
            {coupon.availableTime && (
              <p>
                사용 가능 시간: {coupon.availableTime.start}부터 {coupon.availableTime.end}까지
              </p>
            )}
          </S.Content>
        </S.DisabledContainer>
      )}
    </>
  );
};

export default CouponCard;

const S = {
  Container: styled.div`
    height: 90px;
  `,

  TitleContainer: styled.div`
    padding: 12px 0px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
  `,

  Content: styled.div`
    font-size: 12px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  DisabledContainer: styled.div`
    height: 90px;
    & > * {
      opacity: 0.25;
    }
  `,
};
