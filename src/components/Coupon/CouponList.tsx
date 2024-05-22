import CouponItem from '@/components/Coupon/CouponItem';
import { couponListState } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

const CouponList = () => {
  const couponList = useRecoilValue(couponListState);

  return (
    <>
      {couponList.map((coupon) => (
        <CouponItem key={coupon.id} coupon={coupon} />
      ))}
    </>
  );
};

export default CouponList;
