import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import getShoppingCart from '../../api/getShoppingCart';
import Button from '../../components/Button/Button';
import CartProductContainer from '../../components/CartProductContainer/CartProductContainer';
import { EmptyShoppingCart } from '../../components/EmptyShoppingCart/EmptyShoppingCart';
import Header from '../../components/layout/Header/Header';
import Main from '../../components/layout/Main/Main';
import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import { PaymentSummary } from '../../components/PaymentSummary/PaymentSummary';
import Toast from '../../components/Toast/Toast';
import { CartItemTypes } from '../../types/cartItem';
import { getTotalPrice } from '../../utils/getTotalPrice';
import { subTitleStyle, titleBox, titleStyle } from './shoppingCart.style';
import { Footer } from '../../components/layout/Footer/Footer';

export function ShoppingCart() {
  const [cartItem, setCartItem] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
        selectedCartType: selectedCartId.length,
        selectedCartItem: calculateCartItemQuantity(),
        totalPrice,
      },
    });
  };

  const getCartItemData = async () => {
    try {
      setIsLoading(true);
      const response = await getShoppingCart();
      if (cartItem.length === 0) setIsLoading(false);
      setCartItem(response);
    } catch (e) {
      setError('데이터를 가져오는데 실패했습니다');
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    getCartItemData();
  }, []);

  useEffect(() => {
    if (!isLoading && cartItem) {
      setSelectedCartId(cartItem.map((item) => item.id.toString()));
    }
  }, [isLoading, cartItem]);

  return (
    <PageLayout>
      <Header>
        <p>SHOP</p>
        {Boolean(error) && <Toast>{error && error}</Toast>}
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
