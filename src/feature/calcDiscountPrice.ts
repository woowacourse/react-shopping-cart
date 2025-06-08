import {CartProduct} from '../type/cart';
import {CouponCode} from '../type/coupon';

export const calcDiscountPrice = (
  orderPrice: number,
  isCouponChecked: Record<CouponCode, boolean>,
  selectedItems: CartProduct[]
) => {
  let discountResult = orderPrice;
  const checkedCoupons = Object.keys(isCouponChecked).filter(
    (key) => isCouponChecked[key as keyof typeof isCouponChecked]
  );

  // 30%할인, 2+1 할인 쿠폰 적용되어 있을 때
  if (
    checkedCoupons.includes('MIRACLESALE') &&
    checkedCoupons.includes('BOGO')
  ) {
    return Math.min(
      discountByBOGO(discountByMIRACLESALE(discountResult), selectedItems),
      discountByMIRACLESALE(discountByBOGO(discountResult, selectedItems))
    );
  }

  if (checkedCoupons.includes('MIRACLESALE'))
    discountResult = discountByMIRACLESALE(discountResult);

  if (checkedCoupons.includes('BOGO'))
    discountResult = discountByBOGO(discountResult, selectedItems);

  if (checkedCoupons.includes('FIXED5000'))
    discountResult = discountByFIXED5000(discountResult);

  return discountResult;
};

function findMaxXbuygetY(selectedItems: CartProduct[]) {
  let maxPrice = 0;
  const XbuygetY = selectedItems.filter((item) => item.quantity >= 3);
  XbuygetY.map((item) => {
    if (item.product.price > maxPrice) maxPrice = item.product.price;
  });

  return maxPrice;
}

export function discountByBOGO(price: number, selectedItems: CartProduct[]) {
  return price - findMaxXbuygetY(selectedItems);
}

export function discountByMIRACLESALE(price: number) {
  return price * 0.7;
}

export function discountByFIXED5000(price: number) {
  return price - 5000;
}

export function discountByFREESHIPPING(price: number, deliveryPrice: number) {
  return price - deliveryPrice;
}
