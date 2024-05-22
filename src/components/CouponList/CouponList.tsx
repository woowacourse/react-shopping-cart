import { Coupon } from '../../types/Coupon.type';
import CouponContainer from '../Container/CouponContainer/CouponContainer';
import * as S from './CouponList.style';

interface CouponListProps {
  couponList: Coupon[];
}

function CouponList({ couponList }: CouponListProps) {
  return (
    <S.Layout>
      {couponList.map((coupon) => (
        <CouponContainer key={coupon.code} coupon={coupon} />
      ))}
    </S.Layout>
  );
}

export default CouponList;
