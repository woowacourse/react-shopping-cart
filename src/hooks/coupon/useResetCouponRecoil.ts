import { availableCouponsAtom, maxDiscountAtom, surchargeShippingFeeAtom } from '@recoil/shoppingCart';
import { useResetRecoilState } from 'recoil';

const useResetCouponRecoil = () => {
  const resetAvailableCoupons = useResetRecoilState(availableCouponsAtom);
  const resetSurchargeShippingFee = useResetRecoilState(surchargeShippingFeeAtom);
  const resetMaxDiscountAtom = useResetRecoilState(maxDiscountAtom);

  const resetCouponRecoil = () => {
    resetAvailableCoupons();
    resetSurchargeShippingFee();
    resetMaxDiscountAtom();
  };

  return { resetCouponRecoil };
};

export default useResetCouponRecoil;
