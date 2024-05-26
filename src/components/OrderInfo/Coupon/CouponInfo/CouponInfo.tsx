import { Coupon } from '@type/coupon';
import * as S from './styled';

interface CouponInfoProps {
  coupons: Coupon[];
}

const CouponInfo = ({ coupons }: CouponInfoProps) => {
  return (
    <S.Container>
      <S.Title>쿠폰 내용</S.Title>
      <S.Coupons>
        {coupons.map(coupon => (
          <S.Coupon key={coupon.id}>{coupon.description}</S.Coupon>
        ))}
      </S.Coupons>
    </S.Container>
  );
};

export default CouponInfo;
