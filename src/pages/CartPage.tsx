import AllCheckSection from '../components/AllCheckSection';
import CartItemCountMessage from '../components/CartItemCountMessage';
import ConfirmButton from '../components/ConfirmButton';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import NoCartItems from '../components/NoCartItems';
import PriceSection from '../components/priceSection/PriceSection';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import { usePageContext } from '../contexts/PageContext';

const CartPage = () => {
  const { cartItems } = useCartItemsContext();
  const { setPage } = usePageContext();

  return (
    <>
      <Header />
      <p>장바구니</p>
      {cartItems.length === 0 ? (
        <NoCartItems />
      ) : (
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
        </>
      )}

      <ConfirmButton
        title="주문 확인"
        onClick={() => setPage('orderConfirm')}
      />
    </>
  );
};

export default CartPage;
