import ItemCard from '../components/ItemCard';
import useCartItems from '../hooks/useCartItems';

const CartPage = () => {
  const { cartItems, increaseCartItemQuantity, decreaseCartItemQuantity } =
    useCartItems();

  return (
    <>
      {cartItems.map((item) => (
        <ItemCard
          product={item.product}
          quantity={item.quantity}
          increaseCartItemQuantity={() => increaseCartItemQuantity(item.id)}
          decreaseCartItemQuantity={() => decreaseCartItemQuantity(item.id)}
          key={item.id}
        />
      ))}
    </>
  );
};

export default CartPage;
