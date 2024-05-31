import { COUPON_POLICY } from '@constants/policy';
import { activeCouponCodesState, couponSelectedState } from '@store/couponStore';
import { useRecoilState } from 'recoil';

const useCouponSelected = () => {
  const [couponSelected, setCouponSelected] = useRecoilState(couponSelectedState);
  const [activeCouponCodes, setActiveCouponCodes] = useRecoilState(activeCouponCodesState);

  const isFulledActiveCoupons = activeCouponCodes.length === COUPON_POLICY.max_active_coupon_amount;

  const isDisableCoupon = (couponCode: string) => {
    const includeActiveCoupon = activeCouponCodes.includes(couponCode);
    return isFulledActiveCoupons && !includeActiveCoupon;
  };

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

  return { couponSelected, isDisableCoupon, handleToggleCouponCheckbox };
};

export default useCouponSelected;
