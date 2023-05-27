import { useEffect, useRef } from 'react';

const useCartUpdateApi = (productId: number, value: number, setValue: (value: number) => void) => {
  const prevValue = useRef(value);

  const resetValueOnError = (promise: Promise<Response>, properResStatus: number) => {
    promise
      .then((response) => {
        if (response.status !== properResStatus) setValue(prevValue.current);
        else prevValue.current = value;
      })
      .catch(() => {
        setValue(prevValue.current);
      });
  };

  useEffect(() => {
    if (prevValue.current === value) return;

    if (prevValue.current === 0 && value > 0) {
      fetch('/cart-items', { method: 'POST', body: JSON.stringify({ productId }) });
      resetValueOnError(
        fetch('/cart-items', { method: 'POST', body: JSON.stringify({ productId }) }),
        201
      );
      return;
    }

    if (value === 0) {
      resetValueOnError(fetch(`/cart-items/${productId}`, { method: 'DELETE' }), 204);
      return;
    }

    resetValueOnError(
      fetch(`/cart-items/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: value }),
      }),
      200
    );
  }, [productId, value]);

  return { serverPrevValue: prevValue.current, serverValue: value };
};

export default useCartUpdateApi;
