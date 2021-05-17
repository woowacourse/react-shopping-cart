import { useState } from 'react';

import { useHistory } from 'react-router';

import Checkbox from '../../components/commons/Checkbox/Checkbox';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import CartItem from '../../components/ShoppingCartPage/CartItem/CartItem';

import useCart from '../../hooks/useCart';

import { PATH, RESPONSE_RESULT } from '../../constants';
import { getMoneyString } from '../../utils/format';
import { confirm } from '../../utils/confirm';
import { API } from '../../services/api';

import * as Styled from './ShoppingCartPage.styles';

const ShoppingCartPage = () => {
  const history = useHistory();
  const { cartItems, loading, responseOK, setCartItems } = useCart();
  const [isTotalChecked, setTotalChecked] = useState<boolean>(true);

  if (loading) {
    return (
      <Styled.ShoppingCartPage>
        <Loading />
      </Styled.ShoppingCartPage>
    );
  }

  if (!loading && !responseOK) {
    return (
      <Styled.ShoppingCartPage>
        <NotFound message="상품을 찾을 수 없습니다." />
      </Styled.ShoppingCartPage>
    );
  }

  const setCartItemQuantity = (id: CartItem['id'], quantity: CartItem['quantity']) => {
    API.CHANGE_ITEM_QUANTITY(id, quantity);
    const newCartItems = cartItems.map(item => (item.id === id ? { ...item, quantity } : item));
    setCartItems(newCartItems);
  };

  const setCartItemSelected = (id: CartItem['id'], isSelected: CartItem['isSelected']) => {
    const newCartItems = cartItems.map(item => (item.id === id ? { ...item, isSelected } : item));
    setCartItems(newCartItems);
  };

  const getSelectedItems = () => {
    return cartItems.filter(item => item.isSelected);
  };

  const onToggleTotalCheck = () => {
    const newCartItems = cartItems.map(cartItem => ({ ...cartItem, isSelected: !isTotalChecked }));

    setTotalChecked(isTotalChecked => !isTotalChecked);
    setCartItems(newCartItems);
  };

  const onDeleteCartItem = async (id: CartItem['id']) => {
    const targetIndex = cartItems.findIndex(cartItem => cartItem.id === id);
    if (!confirm(`'${cartItems[targetIndex].name}'을(를) 장바구니에서 삭제하시겠습니까?`)) {
      return;
    }

    const responseResult = await API.DELETE_CART_ITEM(id);

    if (responseResult === RESPONSE_RESULT.FAILURE) {
      alert('상품을 장바구니에서 삭제하는데 실패하였습니다.');
      return;
    }

    const newCartItems = [...cartItems];
    newCartItems.splice(targetIndex, 1);
    setCartItems(newCartItems);
  };

  const onSelectedCartItemDelete = async () => {
    if (!confirm('선택된 모든 상품들을 장바구니에서 삭제하시겠습니까?')) {
      return;
    }

    const selectedCartItemIdList = cartItems.filter(item => item.isSelected).map(item => item.id);
    const responseResult = await API.DELETE_SELECTED_CART_ITEMS(selectedCartItemIdList);

    if (responseResult === RESPONSE_RESULT.FAILURE) {
      alert('상품을 장바구니에서 삭제하는데 실패하였습니다.');
      return;
    }

    const newCartItems = cartItems.filter(cartItem => !selectedCartItemIdList.includes(cartItem.id));
    setCartItems(newCartItems);
  };

  const onOrderLinkButtonClick = () => {
    if (!confirm('선택하신 상품들을 주문하시겠습니까?')) {
      return;
    }

    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) return;
    history.push({ pathname: PATH.ORDER, state: { selectedItems } });
  };

  const isOrderPossible = getSelectedItems().length > 0;

  const totalPrice = cartItems
    .filter(item => item.isSelected)
    .reduce((acc, cartItem) => acc + Number(cartItem.price) * Number(cartItem.quantity), 0);

  const cartItemList = cartItems.map(cartItem => (
    <Styled.CartItemWrapper key={cartItem.id}>
      <CartItem
        thumbnail={cartItem.thumbnail}
        name={cartItem.name}
        price={getMoneyString(Number(cartItem.price) * Number(cartItem.quantity))}
        quantity={cartItem.quantity}
        setQuantity={quantity => setCartItemQuantity(cartItem.id, quantity)}
        isSelected={cartItem.isSelected}
        setSelected={isSelected => setCartItemSelected(cartItem.id, isSelected)}
        onDeleteCartItem={() => onDeleteCartItem(cartItem.id)}
      />
    </Styled.CartItemWrapper>
  ));

  return (
    <Styled.ShoppingCartPage>
      <Styled.Header>
        <PageTitle>장바구니</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.CartContainer>
            <Styled.ControlWrapper>
              <Checkbox labelText="전체 선택 / 선택 해제" onCheck={onToggleTotalCheck} isChecked={isTotalChecked} />
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
            price={getMoneyString(totalPrice)}
            buttonText={`주문하기(${getSelectedItems().length}개)`}
            onPayButtonClick={onOrderLinkButtonClick}
            isPayButtonDisabled={!isOrderPossible}
          />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ShoppingCartPage>
  );
};

export default ShoppingCartPage;
