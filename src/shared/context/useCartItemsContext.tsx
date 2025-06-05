import { useContext } from 'react';
import { CartItemsContext } from './CartItemsProvider';

export const useCartItemsContext = () => {
  const context = useContext(CartItemsContext);

  if (!context) {
    throw new Error('useCartItemsProvider must be used within a CartItemsProvider');
  }
  return context;
};
