import { CartItem, Coupon } from '../types';
import getOrderPrice from './getOrderPrice';

const getDiscountPrice = (
  coupon: Coupon,
  checkedItems: CartItem[],
  deliveryPrice: number,
  orderPrice: number = getOrderPrice(checkedItems)
) => {
  if (orderPrice < (coupon.minimumAmount ?? 0)) return 0;
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount ?? 0;
    case 'buyXgetY':
      return getBogoDiscountPrice(checkedItems, coupon);
    case 'freeShipping':
      return deliveryPrice;
    case 'percentage':
      return orderPrice * ((coupon.discount ?? 0) / 100);
  }
};

export default getDiscountPrice;

const getBogoDiscountPrice = (checkedItems: CartItem[], coupon: Coupon) => {
  const minimumQuantity = (coupon.buyQuantity ?? 0) + (coupon.getQuantity ?? 0);
  if (minimumQuantity === 0) return 0;
  const expensiveItem = checkedItems
    .filter(({ quantity }) => quantity >= minimumQuantity)
    .reduce((acc, item) => (item.product.price > acc.product.price ? item : acc), {
      id: 0,
      product: { id: 0, category: '', imageUrl: '', name: '', price: 0 },
      quantity: 0,
    });

  return expensiveItem.product.price;
};
