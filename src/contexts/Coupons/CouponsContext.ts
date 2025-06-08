import { createContext, useContext } from 'react';
import useCoupons from '../../hooks/useCoupons';

export const CouponsContext = createContext<ReturnType<
  typeof useCoupons
> | null>(null);

export const useCouponsContext = () => {
  const context = useContext(CouponsContext);
  if (!context) {
    throw new Error('useCouponsContext must be used within a CouponsProvider');
  }
  return context;
};
