import { Coupon } from '@appTypes/orderConfirm';
import CouponListItem from '@components/orderConfirm/CouponListItem/CouponListItem';
import { couponListAtom } from '@recoil/orderConfirm';
import { useRecoilValue } from 'recoil';

interface CouponListProps {
  isActiveCoupon: (coupon: Coupon) => boolean;
  isCheckedCoupon: (coupon: Coupon) => boolean;
  onAddTemporarySelectedCoupon: (checked: boolean, coupon: Coupon) => void;
}

const CouponList: React.FC<CouponListProps> = ({ isActiveCoupon, isCheckedCoupon, onAddTemporarySelectedCoupon }) => {
  const couponList = useRecoilValue(couponListAtom);
  return (
    <>
      {couponList?.map((coupon) => (
        <CouponListItem
          key={coupon?.id}
          isActive={isActiveCoupon(coupon)}
          isChecked={isCheckedCoupon(coupon)}
          coupon={coupon}
          onAddTemporarySelectedCoupon={onAddTemporarySelectedCoupon}
        />
      ))}
    </>
  );
};

export default CouponList;
