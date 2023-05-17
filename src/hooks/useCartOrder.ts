import { useRecoilState } from 'recoil';
import cartOrderState from '../recoil/atoms/cartOrderState';
import type { CartItem } from '../type';

const useCartOrder = () => {
  const [cartOrder, setCartOrder] = useRecoilState(cartOrderState);

  const isEnabled = (cartItemId: CartItem['id']) => cartOrder.includes(cartItemId);

  const enable = (cartItemId: CartItem['id']) =>
    setCartOrder((cartOrder) =>
      cartOrder.includes(cartItemId) ? cartOrder : [...cartOrder, cartItemId],
    );

  const toggle = (cartItemId: CartItem['id']) => {
    setCartOrder((cartOrder) =>
      cartOrder.includes(cartItemId)
        ? cartOrder.filter((it) => it !== cartItemId)
        : [...cartOrder, cartItemId],
    );
  };

  const reset = () => {
    setCartOrder([]);
  };

  return {
    cartOrder,
    isEnabled,
    enable,
    toggle,
    reset,
  };
};

export default useCartOrder;
