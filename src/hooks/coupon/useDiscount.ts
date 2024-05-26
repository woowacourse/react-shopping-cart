import { useRecoilValue } from 'recoil';
import { isolatedRegionStore, selectedCartItems } from '@recoil/atoms';
import { Coupon } from '@type/coupon';
import { CartItem } from '@type/cartItem';
import { priceInfoStore } from '@recoil/selectors';
import { useEffect, useState } from 'react';

const useDiscount = (applyingCoupons: Coupon[]) => {
  const [discount, setDiscount] = useState(0);
  const selectedItems = useRecoilValue(selectedCartItems);
  const priceInfo = useRecoilValue(priceInfoStore);
  const isolatedRegion = useRecoilValue(isolatedRegionStore);

  const discountByFixed = (coupon: Coupon) => {
    return coupon.discount as number;
  };

  const discountByBuyXGetY = (selectedItems: CartItem[], coupon: Coupon) => {
    // 2개 이상인 상품을 선별해서
    const targetItems = selectedItems.filter(
      item => item.quantity >= (coupon.buyQuantity as number),
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

  useEffect(() => {
    // 할인율이 큰 퍼센트를 먼저 적용시키기 위해서
    const percentageApply = applyingCoupons.find(coupon => coupon.discountType === 'percentage');

    let percentageDiscount = 0;
    if (percentageApply) {
      percentageDiscount = discountByPercentage(priceInfo.order, percentageApply);
    }

    // 퍼센트를 제외한 나머지 할인 적용
    const newDiscount = applyingCoupons.reduce((acc, cur) => {
      if (cur.discountType !== 'percentage') {
        return acc + discountByCoupon(selectedItems, cur);
      }
      return acc;
    }, 0);

    // 할인율과 나머지 할인을 계산
    setDiscount(newDiscount + percentageDiscount);
  }, [applyingCoupons]);

  return {
    discountAmount: discount,
  };
};

export default useDiscount;
