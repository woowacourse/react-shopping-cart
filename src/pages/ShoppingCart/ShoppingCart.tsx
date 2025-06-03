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
  const { cartItem, error, isLoading, getCartItemData, setError } =
    useFetchCartItems();
  const [selectedCartId, setSelectedCartId] = useState<string[]>([]);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice({ cartItems: cartItem, selectedCartId });

  const calculateCartItemQuantity = () => {
    return cartItem.reduce((a, b) => {
      if (selectedCartId.includes(b.id.toString())) return a + b.quantity;
      return a;
    }, 0);
  };

  const handleConfirm = () => {
    navigate('/confirm', {
      state: {
        selectedItemGroupCount: selectedCartId.length,
        selectedCartItem: calculateCartItemQuantity(),
        totalPrice,
      },
    });
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    if (!isLoading && cartItem) {
      setSelectedCartId(cartItem.map((item) => item.id.toString()));
    }
  }, [isLoading, cartItem]);

  return (
    <PageLayout>
      <Header>
        <p>SHOP</p>
        {Boolean(error) && <Toast>{error}</Toast>}
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>장바구니</p>
          {cartItem.length !== 0 && (
            <p css={subTitleStyle}>
              현재 {cartItem.length}종류의 상품이 담겨있습니다.
            </p>
          )}
        </div>
        {cartItem.length === 0 ? (
          <EmptyShoppingCart />
        ) : (
          <>
            <CartProductContainer
              cartItem={cartItem}
              onChange={getCartItemData}
              onError={handleError}
              selectedCartId={selectedCartId}
              setSelectedCartId={setSelectedCartId}
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
            selectedCartId.length === 0 || cartItem.length === 0
              ? 'secondary'
              : 'primary'
          }
          disabled={selectedCartId.length === 0 || cartItem.length === 0}
        >
          주문 확인
        </Button>
      </Footer>
    </PageLayout>
  );
}
