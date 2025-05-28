import AllCheckSection from '../components/AllCheckSection';
import CartItemCountMessage from '../components/CartItemCountMessage';
import ConfirmButton from '../components/ConfirmButton';
import ItemCard from '../components/ItemCard';
import PriceSection from '../components/priceSection/PriceSection';
import { useCartItemsContext } from '../contexts/CartItemsContext';

const CartPage = () => {
  const { cartItems } = useCartItemsContext();

  return (
    <>
      <CartItemCountMessage />
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
      <ConfirmButton />
    </>
  );
};

export default CartPage;
