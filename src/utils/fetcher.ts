import { getCartItems, getCoupons } from '../apis/cart';
import { useData } from '../context/DataContext';

export const useCartData = () => {
  return useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });
};

export const useCouponData = () => {
  return useData({
    fetcher: getCoupons,
    name: 'couponData',
  });
};
