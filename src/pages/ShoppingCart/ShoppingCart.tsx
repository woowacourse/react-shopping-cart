import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CartProductContainer from '../../components/CartProductContainer/CartProductContainer';
import { EmptyShoppingCart } from '../../components/EmptyShoppingCart/EmptyShoppingCart';
import Header from '../../components/layout/Header/Header';
import Main from '../../components/layout/Main/Main';
import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import { PaymentSummary } from '../../components/PaymentSummary/PaymentSummary';
import Toast from '../../components/Toast/Toast';
import { getTotalPrice } from '../../utils/getTotalPrice';
import { subTitleStyle, titleBox, titleStyle } from './ShoppingCart.style';
import { Footer } from '../../components/layout/Footer/Footer';
import useFetchCartItems from '../../hooks/useFetchCartItems';

export function ShoppingCart() {
  const { cartItems, error, isLoading, getCartItemData, setError } =
    useFetchCartItems();
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice({ cartItems, selectedCartIds });

  const calculateCartItemQuantity = () => {
    return cartItems.reduce((a, b) => {
      if (selectedCartIds.includes(b.id.toString())) return a + b.quantity;
      return a;
    }, 0);
  };

  const handleConfirm = () => {
    navigate('/confirm', {
      state: {
        selectedItemGroupCount: selectedCartIds.length,
        selectedCartItem: calculateCartItemQuantity(),
        totalPrice,
      },
    });
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    if (!isLoading && cartItems) {
      setSelectedCartIds(cartItems.map((item) => item.id.toString()));
    }
  }, [isLoading, cartItems]);

  return (
    <PageLayout>
      <Header>
        <p>SHOP</p>
        {Boolean(error) && <Toast>{error}</Toast>}
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>장바구니</p>
          {cartItems.length !== 0 && (
            <p css={subTitleStyle}>
              현재 {cartItems.length}종류의 상품이 담겨있습니다.
            </p>
          )}
        </div>
        {cartItems.length === 0 ? (
          <EmptyShoppingCart />
        ) : (
          <>
            <CartProductContainer
              cartItems={cartItems}
              onChange={getCartItemData}
              onError={handleError}
              selectedCartIds={selectedCartIds}
              setSelectedCartIds={setSelectedCartIds}
            />
            <PaymentSummary price={totalPrice} />
          </>
        )}
      </Main>
      <Footer>
        <Button
          onClick={handleConfirm}
          type="submit"
          size="full"
          style={
            selectedCartIds.length === 0 || cartItems.length === 0
              ? 'secondary'
              : 'primary'
          }
          disabled={selectedCartIds.length === 0 || cartItems.length === 0}
        >
          주문 확인
        </Button>
      </Footer>
    </PageLayout>
  );
}
