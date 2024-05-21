import CouponListItem from '@components/orderConfirm/CouponListItem/CouponListItem';
import { couponListAtom } from '@recoil/orderConfirm/atoms';
import { useRecoilValue } from 'recoil';

const CouponList = () => {
  const couponList = useRecoilValue(couponListAtom);
  return <>{couponList?.map((coupon) => <CouponListItem coupon={coupon} />)}</>;
};

export default CouponList;
