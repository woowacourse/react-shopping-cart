import { useState } from 'react';
import { useHistory } from 'react-router';
import Checkbox from '../../components/commons/Checkbox/Checkbox';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import CartListItem from '../../components/ShoppingCartPage/CartListItem/CartListItem';
import { PATH } from '../../constants';
import useCart from '../../hooks/useCart';
import { getMoneyString } from '../../utils/format';
import * as Styled from './ShoppingCartPage.styles';
import { confirm } from '../../utils/confirm';
import { CartItem } from '../../type';

const ShoppingCartPage = () => {
  const history = useHistory();

  const {
    cartItems,
    loading,
    error,
    totalCartItemPrice,
    getCartItem,
    deleteAllCartItems,
    deleteCartItem,
    setAllCartItemSelected,
    setCartItemQuantity,
    setCartItemSelected,
    getSelectedCartItems,
  } = useCart();

  const [isTotalChecked, setTotalChecked] = useState(true);

  const onTotalCheckClick = () => {
    setAllCartItemSelected(isTotalChecked);
    setTotalChecked(isTotalChecked => !isTotalChecked);
  };

  const onCartItemDelete = async (id: CartItem['id']) => {
    const targetCartItem = getCartItem(id);

    if (!confirm(`${targetCartItem.name}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      return;
    }

    deleteCartItem(id);
  };

  const onSelectedCartItemDelete = async () => {
    if (cartItems.length === 0) {
      return;
    }

    if (!confirm('선택된 모든 상품들을 장바구니에서 삭제하시겠습니까?')) {
      return;
    }

    deleteAllCartItems();
  };

  const onOrderLinkButtonClick = () => {
    if (!confirm('선택하신 상품들을 주문하시겠습니까?')) {
      return;
    }

    const selectedCartItems = getSelectedCartItems();
    if (selectedCartItems.length === 0) {
      return;
    }

    history.push({ pathname: PATH.ORDER, state: { selectedCartItems } });
  };

  const isOrderPossible = cartItems.length > 0;

  const cartItemList = cartItems.map(cartItem => (
    <Styled.CartItemWrapper key={cartItem.id}>
      <CartListItem
        thumbnail={cartItem.thumbnail}
        name={cartItem.name}
        price={getMoneyString(Number(cartItem.price) * Number(cartItem.quantity))}
        quantity={cartItem.quantity}
        setQuantity={(quantity: CartItem['quantity']) => setCartItemQuantity(cartItem.id, quantity)}
        isSelected={cartItem.isSelected}
        setSelected={(isSelected: boolean) => setCartItemSelected(cartItem.id, isSelected)}
        onCartItemDelete={() => onCartItemDelete(cartItem.id)}
      />
    </Styled.CartItemWrapper>
  ));

  if (loading) {
    return (
      <Styled.ShoppingCartPage>
        <Loading />
      </Styled.ShoppingCartPage>
    );
  }

  if (!loading && error) {
    return (
      <Styled.ShoppingCartPage>
        <NotFound message="장바구니 정보를 조회하는데 실패했습니다" />
      </Styled.ShoppingCartPage>
    );
  }

  return (
    <Styled.ShoppingCartPage>
      <Styled.Header>
        <PageTitle>장바구니</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.CartContainer>
            <Styled.ControlWrapper>
              <Checkbox labelText="전체 선택 / 선택 해제" onCheck={onTotalCheckClick} checked={isTotalChecked} />
              <Styled.DeleteButton onClick={onSelectedCartItemDelete}>상품삭제</Styled.DeleteButton>
            </Styled.ControlWrapper>
            <Styled.CartHeaderWrapper>
              <Styled.CartHeader>배송상품 ({cartItems.length}개)</Styled.CartHeader>
            </Styled.CartHeaderWrapper>
            <Styled.CartItemList>{cartItemList}</Styled.CartItemList>
          </Styled.CartContainer>
        </Styled.Container>
        <Styled.PaymentCheckoutWrapper>
          <PaymentCheckout
            title="결제예상금액"
            priceLabel="결제예상금액"
            price={getMoneyString(totalCartItemPrice)}
            buttonText={`주문하기(${getSelectedCartItems().length}개)`}
            onButtonClick={onOrderLinkButtonClick}
            isButtonDisabled={!isOrderPossible}
          />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ShoppingCartPage>
  );
};

export default ShoppingCartPage;
