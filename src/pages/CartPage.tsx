import ItemCard from '../components/ItemCard';
import useCartItems from '../hooks/useCartItems';

const CartPage = () => {
  const {
    cartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  } = useCartItems();

  return (
    <>
      {cartItems.map((item) => (
        <ItemCard
          product={item.product}
          quantity={item.quantity}
          increaseCartItemQuantity={() => increaseCartItemQuantity(item.id)}
          decreaseCartItemQuantity={() => decreaseCartItemQuantity(item.id)}
          deleteCartItem={() => deleteCartItem(item.id)}
          key={item.id}
        />
      ))}
    </>
  );
};

export default CartPage;
