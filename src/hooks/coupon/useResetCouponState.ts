import { availableCouponsAtom, maxDiscountAtom, surchargeShippingFeeAtom } from '@recoil/shoppingCart';
import { useResetRecoilState } from 'recoil';

const useResetCouponState = () => {
  const resetAvailableCoupons = useResetRecoilState(availableCouponsAtom);
  const resetSurchargeShippingFee = useResetRecoilState(surchargeShippingFeeAtom);
  const resetMaxDiscountAtom = useResetRecoilState(maxDiscountAtom);

  const resetCouponState = () => {
    resetAvailableCoupons();
    resetSurchargeShippingFee();
    resetMaxDiscountAtom();
  };

  return { resetCouponState };
};

export default useResetCouponState;
