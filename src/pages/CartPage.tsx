import AllCheckSection from '../components/AllCheckSection';
import ItemCard from '../components/ItemCard';
import PriceSection from '../components/priceSection/PriceSection';
import { useCartItemsContext } from '../contexts/CartItemsContext';

const CartPage = () => {
  const { cartItems } = useCartItemsContext();

  return (
    <>
      <AllCheckSection />
      {cartItems.map((item) => (
        <ItemCard
          id={item.id}
          product={item.product}
          quantity={item.quantity}
          key={item.id}
        />
      ))}
      <PriceSection />
    </>
  );
};

export default CartPage;
