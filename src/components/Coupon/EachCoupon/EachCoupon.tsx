import * as S from './styled';
import { Coupon } from '../../../types/coupon';
import Checkbox from '../../Checkbox/Checkbox';

interface EachCouponProps {
  coupon: Coupon;
}

const EachCoupon = ({ coupon }: EachCouponProps) => {
  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox id={coupon.id} isChecked onChange={() => console.log('하이')} />
        <S.CouponTitle>{coupon.description}</S.CouponTitle>
      </S.Header>
      <S.Contents>
        <S.CouponCondition>만료일: {coupon.expirationDate}</S.CouponCondition>
        {coupon.availableTime && (
          <S.CouponCondition>
            사용 가능 시간: {`${coupon.availableTime.start}부터 ${coupon.availableTime.end}까지`}
          </S.CouponCondition>
        )}
        {coupon.minimumAmount && (
          <S.CouponCondition>
            최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
          </S.CouponCondition>
        )}
      </S.Contents>
    </S.Container>
  );
};

export default EachCoupon;
