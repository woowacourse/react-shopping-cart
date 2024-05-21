import { Coupon } from '@appTypes/shoppingCart';
import { orderPriceSelector, selectedItemsSelector } from '@recoil/shoppingCart';
import { isOrderPriceAboveMinimum, isValidatedBuyQuantity, isValidatedExpiration, isValidatedTime } from '@utils/index';
import { useRecoilValue } from 'recoil';

import useCouponFinder from './useCouponFinder';

const useAvailableCoupons = () => {
  const selectedItems = useRecoilValue(selectedItemsSelector);
  const orderPrice = useRecoilValue(orderPriceSelector);
  const { getAllCoupons } = useCouponFinder();
  const { fixed5000Coupon, bogoCoupon, freeShippingCoupon, miracleCoupon } = getAllCoupons();

  const isAvailableFixed5000 = () => {
    const { expirationDate, minimumAmount } = fixed5000Coupon;

    if (!isValidatedExpiration(expirationDate)) return false;
    if (!minimumAmount || !isOrderPriceAboveMinimum(orderPrice, minimumAmount)) return false;

    return true;
  };

  const isAvailableBOGO = () => {
    const { expirationDate, buyQuantity } = bogoCoupon;
    if (!isValidatedExpiration(expirationDate)) return false;
    if (!buyQuantity || !isValidatedBuyQuantity(buyQuantity, selectedItems)) return false;

    return true;
  };

  const isAvailableFreeShipping = () => {
    const { expirationDate, minimumAmount } = freeShippingCoupon;

    if (!isValidatedExpiration(expirationDate)) return false;
    if (!minimumAmount || !isOrderPriceAboveMinimum(orderPrice, minimumAmount)) return false;

    return true;
  };

  const isAvailableMiracleSale = () => {
    const { expirationDate, availableTime } = miracleCoupon;
    if (!isValidatedExpiration(expirationDate)) return false;

    if (!availableTime || !isValidatedTime(availableTime)) return false;

    return true;
  };

  const getAvailableCoupons = () => {
    const coupons: Coupon[] = [];

    if (isAvailableFixed5000()) coupons.push(fixed5000Coupon);
    if (isAvailableBOGO()) coupons.push(bogoCoupon);
    if (isAvailableFreeShipping()) coupons.push(freeShippingCoupon);
    if (isAvailableMiracleSale()) coupons.push(miracleCoupon);

    return coupons;
  };

  return { getAvailableCoupons };
};

export default useAvailableCoupons;
