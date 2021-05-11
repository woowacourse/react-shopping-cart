import axios from 'axios';
import { useState } from 'react';
import Checkbox from '../../components/commons/Checkbox/Checkbox';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import CartItem from '../../components/ShoppingCartPage/CartItem/CartItem';
import { URL, STATUS_CODE } from '../../constants';
import useCart from '../../hooks/cart';
import { getMoneyString } from '../../utils/format';
import * as Styled from './ShoppingCartPage.styles';

const ShoppingCartPage = () => {
  const { cartItems, loading, responseOK, setCartItems } = useCart();
  const [isTotalChecked, setTotalChecked] = useState<boolean>();

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

  const getSelectedItemCount = () => {
    return cartItems.filter(item => item.isSelected).length;
  };

  return (
    <Styled.ShoppingCartPage>
      <Styled.Header>
        <PageTitle>장바구니</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.CartContainer>
            <Styled.ControlWrapper>
              <Checkbox labelText="전체 선택 / 선택 해제" onCheck={onTotalCheckClick} />
              <Styled.DeleteButton>상품삭제</Styled.DeleteButton>
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
            buttonText={`주문하기(${getSelectedItemCount()}개)`}
          />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ShoppingCartPage>
  );
};

export default ShoppingCartPage;
