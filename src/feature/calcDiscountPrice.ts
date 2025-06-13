import {CartProduct} from '../type/cart';
import {CouponCode, CouponType} from '../type/coupon';

type DiscountFunction = (
  price: number,
  discount?: number,
  selectedItems?: CartProduct[]
) => number;

const discountRules: {code: CouponCode; discount: DiscountFunction}[] = [
  {
    code: 'FIXED5000',
    discount: (price, discount = 0) => price - discount,
  },
  {
    code: 'BOGO',
    discount: (price, _, selectedItems = []) =>
      price - findMaxXbuygetY(selectedItems),
  },
  {
    code: 'MIRACLESALE',
    discount: (price, discount = 0) => price - price * (discount / 100),
  },
  {
    code: 'FREESHIPPING',
    discount: (price: number) => price,
  },
];

export const calcDiscountPrice = (
  orderPrice: number,
  checkedCoupons: CouponType[],
  selectedItems: CartProduct[]
) => {
  if (checkedCoupons.length === 0) return orderPrice;

  if (checkedCoupons.length === 1) {
    const rule = discountRules.find((r) => r.code === checkedCoupons[0].code);
    return Number(
      rule?.discount(orderPrice, checkedCoupons[0]?.discount, selectedItems)
    );
  }

  const couponOrders = [
    [checkedCoupons[0], checkedCoupons[1]],
    [checkedCoupons[1], checkedCoupons[0]],
  ];

  const prices = couponOrders.map((coupons) => {
    return coupons.reduce((currentPrice, coupon) => {
      const rule = discountRules.find((r) => r.code === coupon.code);
      if (!rule) return currentPrice;
      return rule.discount(currentPrice, coupon.discount, selectedItems);
    }, orderPrice);
  });

  const bestPrice = Math.min(...prices);
  return bestPrice;
};

function findMaxXbuygetY(selectedItems: CartProduct[]) {
  let maxPrice = 0;
  const XbuygetY = selectedItems.filter((item) => item.quantity >= 3);
  XbuygetY.map((item) => {
    if (item.product.price > maxPrice) maxPrice = item.product.price;
  });

  return maxPrice;
}
