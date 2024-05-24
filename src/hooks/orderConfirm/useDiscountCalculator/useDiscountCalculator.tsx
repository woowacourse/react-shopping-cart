import { Coupon } from '@appTypes/orderConfirm';
import { orderPriceSelector, selectedItemsSelector, shippingPriceSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

export const useDiscountCalculator = () => {
  const selectedCartItems = useRecoilValue(selectedItemsSelector);
  const shippingPrice = useRecoilValue(shippingPriceSelector);
  const orderPrice = useRecoilValue(orderPriceSelector);

  const calculateBOGODiscount = () => {
    const selectedCartItemDiscountPrices = selectedCartItems.map((selectedCartItem) => {
      if (selectedCartItem.quantity >= 3) return selectedCartItem.product.price;

      return 0;
    });

    return Math.max(...selectedCartItemDiscountPrices);
  };

  const calculateDiscountAmount = (coupon: Coupon) => {
    switch (coupon.discountType) {
      case 'fixed':
        return coupon.discount ?? 0;
      case 'percentage':
        return Math.floor((orderPrice * (coupon.discount ?? 0)) / 100);
      case 'buyXgetY':
        return calculateBOGODiscount();
      case 'freeShipping': {
        return shippingPrice;
      }
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};
