import useCouponList from '@hooks/coupon/useCouponList';
import useCouponSelected from '@hooks/coupon/useCouponSelected';
import CouponItem from './CouponItem';

export default function CouponList() {
  const { availableCoupons, unAvailableCoupons } = useCouponList();
  const { couponSelected, isDisableCoupon, handleToggleCouponCheckbox } = useCouponSelected();

  return (
    <>
      {availableCoupons.map((coupon) => {
        return (
          <CouponItem
            key={coupon.code}
            coupon={coupon}
            isChecked={couponSelected[coupon.code]}
            isDisableCoupon={isDisableCoupon(coupon.code)}
            onChange={() => {
              handleToggleCouponCheckbox(coupon.code);
            }}
          />
        );
      })}

      {unAvailableCoupons.map((coupon) => {
        return (
          <CouponItem
            key={coupon.code}
            coupon={coupon}
            isChecked={couponSelected[coupon.code]}
            isDisableCoupon={true}
            onChange={() => {
              handleToggleCouponCheckbox(coupon.code);
            }}
          />
        );
      })}
    </>
  );
}
