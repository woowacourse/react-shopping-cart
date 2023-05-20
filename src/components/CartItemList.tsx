import { useCartState } from '../recoils/recoilCart';

import { CartItem } from './exporter';

export const CartItemList = () => {
  const [cart] = useCartState();

  return (
    <ul>
      {cart.map(({ id }) => (
        <CartItem key={id} productId={id} />
      ))}
    </ul>
  );
};
