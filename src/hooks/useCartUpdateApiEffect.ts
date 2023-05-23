import { useEffect, useRef } from 'react';
import usePreviousValue from './usePreviousValue';

const useCartUpdateApiEffect = (productId: number, value: number) => {
  const prevValue = usePreviousValue(value);

  useEffect(() => {
    if (prevValue === value) return;

    if (prevValue === 0 && value > 0) {
      fetch('/cart-items', { method: 'POST', body: JSON.stringify({ productId }) });
      return;
    }

    if (value === 0) {
      fetch(`/cart-items/${productId}`, { method: 'DELETE' });
      return;
    }

    fetch(`/cart-items/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: value }),
    });
  }, [productId, value]);
};

export default useCartUpdateApiEffect;
