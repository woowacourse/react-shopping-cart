import { useRecoilValue } from 'recoil';
import { selectedCartItems } from '@recoil/atoms';
import { BuyXGetYCoupon, Coupon, FixedCoupon, PercentageCoupon } from '@type/coupon';
import { CartItem } from '@type/cartItem';
import { useEffect, useState } from 'react';
import usePriceInfo from '@hooks/usePriceInfo';
import { IPriceInfo } from '@type/priceInfo';

const discountByFixed = (coupon: FixedCoupon) => {
  return coupon.discount as number;
};

const discountByBuyXGetY = (selectedItems: CartItem[], coupon: BuyXGetYCoupon) => {
  // 2개 이상인 상품을 선별해서
  const targetItems = selectedItems.filter(item => item.quantity >= (coupon.buyQuantity as number));

  // 가장 가격이 비싼 상품을 고른다.
  const targetItemsPrice = targetItems.map(item => item.product.price);
  const maxPrice = Math.max(...targetItemsPrice);

  return maxPrice;
};

const discountByFreeShipping = (priceInfo: IPriceInfo, isolatedRegion: boolean) => {
  return priceInfo.shipping === 0 ? 0 : isolatedRegion ? 6000 : 3000;
};

const discountByPercentage = (cartItemsPrice: number, coupon: PercentageCoupon) => {
  return (cartItemsPrice * (coupon.discount as number)) / 100;
};

const useDiscount = (applyingCoupons: Coupon[], isolatedRegion: boolean) => {
  const [discount, setDiscount] = useState(0);
  const selectedItems = useRecoilValue(selectedCartItems);
  const priceInfo = usePriceInfo(isolatedRegion);

  const discountByCoupon = (selectedItems: CartItem[], coupon: Coupon) => {
    if (coupon.discountType === 'fixed') return discountByFixed(coupon as FixedCoupon);
    if (coupon.discountType === 'buyXgetY')
      return discountByBuyXGetY(selectedItems, coupon as BuyXGetYCoupon);
    if (coupon.discountType === 'freeShipping')
      return discountByFreeShipping(priceInfo, isolatedRegion);
    if (coupon.discountType === 'percentage')
      return discountByPercentage(
        selectedItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0),
        coupon as PercentageCoupon,
      );

    return 0;
  };

  useEffect(() => {
    // 할인율이 큰 퍼센트를 먼저 적용시키기 위해서
    const percentageApply = applyingCoupons.find(coupon => coupon.discountType === 'percentage');

    let percentageDiscount = 0;
    if (percentageApply) {
      percentageDiscount = discountByPercentage(
        priceInfo.order,
        percentageApply as PercentageCoupon,
      );
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
