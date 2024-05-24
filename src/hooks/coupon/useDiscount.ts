import { useRecoilValue } from 'recoil';
import { isolatedRegionStore, selectedCartItems, selectedCoupons } from '../../recoil/atoms';
import { Coupon } from '../../types/coupon';
import { CartItem } from '../../types/cartItem';
import { priceInfoStore } from '../../recoil/selectors';

const useDiscount = () => {
  const applyingCoupon = useRecoilValue(selectedCoupons);
  const selectedItems = useRecoilValue(selectedCartItems);
  const priceInfo = useRecoilValue(priceInfoStore);
  const isolatedRegion = useRecoilValue(isolatedRegionStore);

  const discountByFixed = (coupon: Coupon) => {
    return coupon.discount as number;
  };

  const discountByBuyXGetY = (selectedItems: CartItem[], coupon: Coupon) => {
    // 3개 이상인 상품을 선별해서
    const targetItems = selectedItems.filter(
      item => item.quantity > (coupon.buyQuantity as number),
    );

    // 가장 가격이 비싼 상품을 고른다.
    const targetItemsPrice = targetItems.map(item => item.product.price);
    const maxPrice = Math.max(...targetItemsPrice);

    return maxPrice;
  };

  const discountByFreeShipping = () => {
    return priceInfo.shipping === 0 ? 0 : isolatedRegion ? 6000 : 3000;
  };

  const discountByPercentage = (cartItemsPrice: number, coupon: Coupon) => {
    return (cartItemsPrice * (coupon.discount as number)) / 100;
  };

  const discountByCoupon = (selectedItems: CartItem[], coupon: Coupon) => {
    if (coupon.discountType === 'fixed') return discountByFixed(coupon);
    if (coupon.discountType === 'buyXgetY') return discountByBuyXGetY(selectedItems, coupon);
    if (coupon.discountType === 'freeShipping') return discountByFreeShipping();
    if (coupon.discountType === 'percentage')
      return discountByPercentage(
        selectedItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0),
        coupon,
      );

    return 0;
  };

  return {
    discountAmount: applyingCoupon.reduce(
      (acc, cur) => acc + discountByCoupon(selectedItems, cur),
      0,
    ),
  };
};

export default useDiscount;
