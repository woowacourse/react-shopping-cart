import { useCartItemsContext } from '../contexts/CartItemsContext';

const CartItemCountMessage = () => {
  const { cartItems } = useCartItemsContext();
  return <div>{`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}</div>;
};

export default CartItemCountMessage;
