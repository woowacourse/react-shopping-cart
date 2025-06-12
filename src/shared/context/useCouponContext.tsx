import { useContext } from 'react';
import { CouponContext } from './CouponProvider';

export const useCouponContext = () => {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error('useCouponContext must be used within a CartProvider');
  }
  return context;
};
