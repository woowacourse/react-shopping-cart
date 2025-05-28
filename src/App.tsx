import { useEffect, useState } from 'react';
import * as S from './App.styles';
import { CartHeader, CartList, OrderPriceSummary } from './features/cart/ui';
import Footer from './widgets/footer/ui/Footer';
import Navbar from './widgets/navbar/ui/Navbar';
import { getCartItems } from './features/cart/api/getCartItems';
import { useSelectedCartContext } from './shared/context/useCartContext';
import { CartItem } from './shared/type/cart';
import EmptyCartItemUI from './features/cart/ui/EmptyCartItemUI';

function App() {
  const { addAllCartItemsInSelected, selectedCartItems } = useSelectedCartContext();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        if (!response) return;

        setCartItems(response.content);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch cart items:', error.message);
          alert('장바구니 아이템을 불러오는 데 실패했습니다. 다시 시도해주세요.');
        }
      }
    };
    fetchCartItems();
  }, [selectedCartItems]);

  return (
    <S.AppContainer>
      <Navbar />
      <S.AppContent>
        <CartHeader cartTypeQuantity={cartItems.length} />
        {cartItems.length > 0 ? (
          <>
            <CartList
              cartItems={cartItems}
              setCartItems={setCartItems}
              addAllCartItemsInSelected={addAllCartItemsInSelected}
            />
            <OrderPriceSummary />
          </>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.AppContent>

      <Footer cartItemQuantity={cartItems.length} />
    </S.AppContainer>
  );
}

export default App;
