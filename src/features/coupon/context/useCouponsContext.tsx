import { useContext } from 'react';
import { CouponsContext } from './CouponsProvider.tsx';

export const useCouponsContext = () => {
  const context = useContext(CouponsContext);
  if (context === undefined) {
    throw new Error('useCouponsContext must be used within a CouponsProvider');
  }
  return context;
};
