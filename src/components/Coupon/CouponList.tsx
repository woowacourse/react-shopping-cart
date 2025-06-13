import { CouponType } from '../../types/cart';
import CouponItem from './CouponItem';
import { useCoupon } from '../../context/CouponContext';
import { useCouponData } from '../../utils/fetcher';
import { useOrderSummary } from '../../hooks/useOrderSummary';

function CouponList() {
  const { data: coupons } = useCouponData();
  const { price } = useOrderSummary();
  const { selectedCoupons, handleCouponSelect, checkCouponsDisable } = useCoupon();

  return (
    <>
      {coupons?.map((couponItem: CouponType) => (
        <CouponItem
          key={couponItem.id}
          coupon={couponItem}
          isSelected={selectedCoupons.some((coupon) => coupon.id === couponItem.id)}
          onSelect={() => handleCouponSelect(couponItem)}
          disabled={checkCouponsDisable(couponItem, price)}
        />
      ))}
    </>
  );
}

export default CouponList;
