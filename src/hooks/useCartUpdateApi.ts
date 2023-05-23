import { useEffect, useRef } from 'react';

const useCartUpdateApi = (productId: number, value: number, setValue: (value: number) => void) => {
  const prevValue = useRef(value);

  const resetValueOnError = (promise: Promise<Response>) => {
    promise
      .then((response) => {
        if (!response.ok) setValue(prevValue.current);
        else prevValue.current = value;
      })
      .catch(() => {
        setValue(prevValue.current);
      });
  };

  useEffect(() => {
    if (prevValue.current === value) return;

    if (prevValue.current === 0 && value > 0) {
      resetValueOnError(
        fetch('/cart-items', { method: 'POST', body: JSON.stringify({ productId }) })
      );
      return;
    }

    if (value === 0) {
      resetValueOnError(fetch(`/cart-items/${productId}`, { method: 'DELETE' }));
      return;
    }

    resetValueOnError(
      fetch(`/cart-items/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: value }),
      })
    );
  }, [productId, value]);
};

export default useCartUpdateApi;
