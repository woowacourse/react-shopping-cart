import useCouponList from './useCouponList';
import useSelectedCouponList from './useSelectedCouponList';
import { validateCouponAvailable } from '../../utils/validateCouponAvailable';

const useValidateAvailableCoupon = () => {
  const { couponList } = useCouponList();
  const { selectedCouponList } = useSelectedCouponList();

  const avaliableCouponList =
    selectedCouponList.length === 2
      ? selectedCouponList
      : couponList.filter((coupon: Coupon) => validateCouponAvailable(coupon));

  const isAvailableCoupon = (coupon: Coupon) => {
    return avaliableCouponList.includes(coupon);
  };

  return { isAvailableCoupon };
};

export default useValidateAvailableCoupon;
