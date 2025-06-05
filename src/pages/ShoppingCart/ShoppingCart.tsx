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
import {
  subTitleStyle,
  titleBox,
  titleStyle,
  spinnerWrapper,
} from './ShoppingCart.style';
import { Footer } from '../../components/layout/Footer/Footer';
import useFetchCartItems from '../../hooks/useFetchCartItems';
import { getCartItemSummary } from '../../utils/getCartItemSummary';
import Spinner from '../../components/Splinner/Splinner';

export function ShoppingCart() {
  const navigate = useNavigate();

  const { cartItems, error, isLoading, isFetching, getCartItemData, setError } =
    useFetchCartItems();
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  const { totalPrice, totalQuantity } = getCartItemSummary(
    cartItems,
    selectedCartIds
  );

  const handleConfirm = () => {
    navigate('/confirm', {
      state: {
        selectedItemGroupCount: selectedCartIds.length,
        selectedCartItem: totalQuantity,
        totalPrice,
      },
    });
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    if (!isLoading && cartItems.length > 0) {
      setSelectedCartIds(cartItems.map((item) => item.id.toString()));
    }
  }, [isLoading]);

  // 예시
  const shouldDisableButton =
    cartItems.length === 0 || selectedCartIds.length === 0;

  return (
    <PageLayout>
      <Header>
        <p>SHOP</p>
        {Boolean(error) && <Toast>{error}</Toast>}
      </Header>
      <Main>
        {isLoading ? (
          <div css={spinnerWrapper}>
            <Spinner size={60} />
          </div>
        ) : (
          <>
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
                  isFetching={isFetching}
                />
                <PaymentSummary price={totalPrice} />
              </>
            )}
          </>
        )}
      </Main>
      <Footer>
        <Button
          onClick={handleConfirm}
          type="submit"
          size="full"
          style={shouldDisableButton ? 'secondary' : 'primary'}
          disabled={selectedCartIds.length === 0 || cartItems.length === 0}
        >
          주문 확인
        </Button>
      </Footer>
    </PageLayout>
  );
}
