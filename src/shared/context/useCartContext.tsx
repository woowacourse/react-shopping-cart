import { useContext } from 'react';

import { CartContext } from './shoppingContext';

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a ShoppingContext');
  }
  return context;
};
