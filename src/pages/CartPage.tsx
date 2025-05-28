import ItemCard from '../components/ItemCard';
import { useCartItemsContext } from '../contexts/CartItemsContext';

const CartPage = () => {
  const { cartItems } = useCartItemsContext();

  return (
    <>
      {cartItems.map((item) => (
        <ItemCard
          id={item.id}
          product={item.product}
          quantity={item.quantity}
          key={item.id}
        />
      ))}
    </>
  );
};

export default CartPage;
