import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CartProductContainer,
  EmptyShoppingCart,
  Header,
  Main,
  PageLayout,
  PaymentSummary,
  Toast,
  Spinner,
  Footer,
} from '../../components';
import {
  subTitleStyle,
  titleBox,
  titleStyle,
  spinnerWrapper,
} from './ShoppingCart.style';
import {
  getCartItemSummary,
  setItem,
  SELECTED_CART_ITEM_IDS,
  getDeliveryFee,
} from '../../utils';
import { useCartItemsContext } from '../../components/Common/CartItemsProvider/CartItemsProvider';

export function ShoppingCart() {
  const navigate = useNavigate();

  const { cartItems, error, isLoading, isFetching, getCartItemData, setError } =
    useCartItemsContext();
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
    setItem(
      SELECTED_CART_ITEM_IDS,
      cartItems.map((e) => e.id.toString())
    );
  }, [cartItems]);

  useEffect(() => {
    if (!isLoading && cartItems.length > 0) {
      setSelectedCartIds(cartItems.map((item) => item.id.toString()));
    }
  }, [isLoading]);

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
                <PaymentSummary
                  price={totalPrice}
                  deliveryFee={getDeliveryFee(false, totalPrice)}
                />
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
