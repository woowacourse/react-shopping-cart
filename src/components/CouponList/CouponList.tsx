import { Coupon } from '../../types/Coupon.type';
import * as S from './CouponList.style';

interface CouponListProps {
  couponList: Coupon[];
}

function CouponList({ couponList }: CouponListProps) {
  return (
    <S.Layout>
      {couponList.map((coupon) => (
        <>
          <div>{coupon.description}</div>
          <div>{coupon.expirationDate}</div>
          {coupon.minimumAmount && <div>{coupon.minimumAmount}</div>}
        </>
      ))}
    </S.Layout>
  );
}

export default CouponList;
