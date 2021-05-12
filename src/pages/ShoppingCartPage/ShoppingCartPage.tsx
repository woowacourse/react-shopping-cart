import { useState } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router';

import Checkbox from '../../components/commons/Checkbox/Checkbox';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import CartItem from '../../components/ShoppingCartPage/CartItem/CartItem';

import useCart from '../../hooks/cart';

import { URL, STATUS_CODE, PATH } from '../../constants';
import { getMoneyString } from '../../utils/format';
import { confirm } from '../../utils/confirm';

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

  const patchItemQuantity = async (id: CartItem['id'], quantity: CartItem['quantity']) => {
    try {
      const response = await axios.patch(`${URL.CART}/${id}`, { quantity });

      if (response.status !== STATUS_CODE.PUT_SUCCESS) {
        throw new Error('상품 수량 변경에 실패하였습니다');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setCartItemQuantity = (id: CartItem['id'], quantity: CartItem['quantity']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const newCartItem = { ...newCartItems[targetIndex], quantity };

    patchItemQuantity(id, quantity);
    newCartItems.splice(targetIndex, 1, newCartItem);
    setCartItems(newCartItems);
  };

  const setCartItemSelected = (id: CartItem['id'], isSelected: CartItem['isSelected']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const newCartItem = { ...newCartItems[targetIndex], isSelected };

    newCartItems.splice(targetIndex, 1, newCartItem);
    setCartItems(newCartItems);
  };

  const onTotalCheckClick = () => {
    const newCartItems = cartItems.map(cartItem => ({ ...cartItem, isSelected: !isTotalChecked }));

    setTotalChecked(isTotalChecked => !isTotalChecked);
    setCartItems(newCartItems);
  };

  const onCartItemDelete = async (id: CartItem['id']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);

    if (!confirm(`${newCartItems[targetIndex].name}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const response = await axios.delete(`${URL.CART}/${id}`);

      if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
        throw new Error('장바구니 아이템 삭제에 실패하였습니다');
      }

      newCartItems.splice(targetIndex, 1);
      setCartItems(newCartItems);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const onSelectedCartItemDelete = async () => {
    if (!confirm('선택된 모든 상품들을 장바구니에서 삭제하시겠습니까?')) {
      return;
    }
    const selectedCartItemIdList = cartItems.filter(item => item.isSelected).map(item => item.id);
    try {
      selectedCartItemIdList.forEach(async id => {
        const response = await axios.delete(`${URL.CART}/${id}`);
        if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
          throw new Error('장바구니 아이템 삭제에 실패하였습니다');
        }
      });
      const newCartItems = cartItems.filter(cartItem => !selectedCartItemIdList.includes(cartItem.id));
      setCartItems(newCartItems);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

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
        onCartItemDelete={() => onCartItemDelete(cartItem.id)}
      />
    </Styled.CartItemWrapper>
  ));

  const totalPrice = String(
    cartItems.reduce((acc, cartItem) => {
      if (!cartItem.isSelected) {
        return acc;
      }

      return acc + Number(cartItem.price) * Number(cartItem.quantity);
    }, 0)
  );

  const getSelectedItems = () => {
    return cartItems.filter(item => item.isSelected);
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

  return (
    <Styled.ShoppingCartPage>
      <Styled.Header>
        <PageTitle>장바구니</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.CartContainer>
            <Styled.ControlWrapper>
              <Checkbox labelText="전체 선택 / 선택 해제" onCheck={onTotalCheckClick} isChecked={isTotalChecked} />
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
            onButtonClick={onOrderLinkButtonClick}
            isButtonDisabled={!isOrderPossible}
          />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ShoppingCartPage>
  );
};

export default ShoppingCartPage;
