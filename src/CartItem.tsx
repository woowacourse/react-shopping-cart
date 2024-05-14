import { useSetRecoilState } from 'recoil';

import { deleteItem, updateItemQuantity } from './apis/cartItem';
import { CartItemProps, cartItemsState } from './recoil/cartItems';

interface Props {
  item: CartItemProps;
}

const CartItem = ({ item }: Props) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleDecrementQuantity = async () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
          : cartItem,
      ),
    );
    await updateItemQuantity(item.id, item.quantity - 1);
  };

  const handleIncrementQuantity = async () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      ),
    );

    await updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleDeleteItem = async () => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== item.id));
    await deleteItem(item.id);
  };

  return (
    <li>
      <div>{item.product.name}</div>
      <div>{item.product.price}</div>
      <div>{item.product.category}</div>
      <div>개수 : {item.quantity}</div>

      <button onClick={handleDecrementQuantity} disabled={item.quantity === 1}>
        -
      </button>
      <button onClick={handleIncrementQuantity}>+</button>
      <button onClick={handleDeleteItem}>삭제</button>
    </li>
  );
};

export default CartItem;
