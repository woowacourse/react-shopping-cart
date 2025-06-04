import { CartItem, Coupon } from '../types';

const getDiscountPrice = (checkedItems: CartItem[], deliveryPrice: number, coupon: Coupon) => {
  switch (coupon.discountType) {
    case 'fixed':
    case 'buyXgetY':
    case 'freeShipping':
    case 'percentage':
  }
};

export default getDiscountPrice;
