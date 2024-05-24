import { useRecoilValue } from 'recoil';

import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { Coupon } from '../types/Coupon.type';
import { useCouponApplicabilityChecker } from './useCouponApplicabilityChecker';

function useSortCoupons(coupons: Coupon[]) {
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  return coupons.sort((a, b) => {
    if (isCouponApplicable(a, selectedCartItemTotalPrice) && !isCouponApplicable(b, selectedCartItemTotalPrice))
      return -1;
    if (!isCouponApplicable(a, selectedCartItemTotalPrice) && isCouponApplicable(b, selectedCartItemTotalPrice))
      return 1;

    return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
  });
}

export default useSortCoupons;
