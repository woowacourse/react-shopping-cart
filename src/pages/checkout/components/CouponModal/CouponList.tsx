import { useRecoilState } from 'recoil';
import { activeCouponCodesState, couponSelectedState } from '../../../../store/atoms';
import { COUPON_POLICY } from '../../../../constants/policy';
import CouponItem from './CouponItem';
import useAvailableCouponList from '../../../../hooks/coupon/useAvailableCouponList';

export default function CouponList() {
  const [couponSelected, setCouponSelected] = useRecoilState(couponSelectedState);
  const [activeCouponCodes, setActiveCouponCodes] = useRecoilState(activeCouponCodesState);

  const isFulledActiveCoupons = activeCouponCodes.length === COUPON_POLICY.max_active_coupon_amount;

  const { availableCoupons, unAvailableCoupons } = useAvailableCouponList();

  const handleToggleCouponCheckbox = (toggledCouponCode: string) => {
    const newCheckedState = !couponSelected[toggledCouponCode];

    if (
      newCheckedState === true &&
      activeCouponCodes.length >= COUPON_POLICY.max_active_coupon_amount
    )
      return;

    const newCouponSelected = {
      ...couponSelected,
      [toggledCouponCode]: newCheckedState,
    };
    setCouponSelected(newCouponSelected);

    if (newCheckedState) {
      const newActiveCoupons = [...activeCouponCodes, toggledCouponCode];
      setActiveCouponCodes(newActiveCoupons);
    } else {
      const newActiveCoupons = activeCouponCodes.filter((code) => code !== toggledCouponCode);
      setActiveCouponCodes(newActiveCoupons);
    }
  };

  return (
    <>
      {availableCoupons.map((coupon) => {
        const includeActiveCoupon = activeCouponCodes.includes(coupon.code);
        const isDisableCoupon = isFulledActiveCoupons && !includeActiveCoupon;
        return (
          <CouponItem
            key={coupon.code}
            coupon={coupon}
            isChecked={couponSelected[coupon.code]}
            isDisableCoupon={isDisableCoupon}
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
