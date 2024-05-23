import {
  availableCouponsAtom,
  maxDiscountAtom,
  selectedCouponsAtom,
  surchargeShippingFeeAtom,
} from '@recoil/shoppingCart';
import { useResetRecoilState } from 'recoil';

const useResetCouponRecoil = () => {
  const resetAvailableCoupons = useResetRecoilState(availableCouponsAtom);
  const resetSelectedCoupons = useResetRecoilState(selectedCouponsAtom);
  const resetSurchargeShippingFee = useResetRecoilState(surchargeShippingFeeAtom);
  const resetMaxDiscountAtom = useResetRecoilState(maxDiscountAtom);

  const resetCouponRecoil = () => {
    resetAvailableCoupons();
    resetSelectedCoupons();
    resetSurchargeShippingFee();
    resetMaxDiscountAtom();
  };

  return { resetCouponRecoil };
};

export default useResetCouponRecoil;
