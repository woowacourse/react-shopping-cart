import CouponItem from './CouponItem';
import { couponState } from '@/store/selectors/dataFetchSelector';
import { useRecoilValue } from 'recoil';

const CouponList = () => {
  const couponList = useRecoilValue(couponState);
  console.log(couponList);
  return (
    <>
      {couponList.map((coupon) => (
        <CouponItem coupon={coupon} />
      ))}
    </>
  );
};

export default CouponList;
