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
  const {
    cart,
    deleteCartItem,
    changeCartItemQuantity,
    selectCartItem,
    selectAllCartItems,
    loading,
    loadingError,
  } = useCart();
  const [isTotalChecked, setTotalChecked] = useState<boolean>(true);

  if (loading) {
    return (
      <Styled.ShoppingCartPage>
        <Loading />
      </Styled.ShoppingCartPage>
    );
  }

  if (!loading && loadingError) {
    return (
      <Styled.ShoppingCartPage>
        <NotFound message="상품을 찾을 수 없습니다." />
      </Styled.ShoppingCartPage>
    );
  }

  const getSelectedItems = () => {
    return cart.filter(item => item.isSelected);
  };

  const onToggleTotalCheck = () => {
    selectAllCartItems(!isTotalChecked);
    setTotalChecked(isTotalChecked => !isTotalChecked);
  };

  const onDeleteCartItem = async (id: CartItem['productId']) => {
    const targetIndex = cart.findIndex(cartItem => cartItem.productId === id);
    if (!confirm(`'${cart[targetIndex].name}'을(를) 장바구니에서 삭제하시겠습니까?`)) {
      return;
    }

    deleteCartItem(cart[targetIndex]);
  };

  const onSelectedCartItemDelete = async () => {
    if (!confirm('선택된 모든 상품들을 장바구니에서 삭제하시겠습니까?')) {
      return;
    }

    const selectedCartItemList = cart.filter(item => item.isSelected);
    selectedCartItemList.forEach(item => deleteCartItem(item));
  };

  const onOrderLinkButtonClick = () => {
    if (!confirm('선택하신 상품들을 주문하시겠습니까?')) {
      return;
    }

    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) return;
    history.push({ pathname: PATH.ORDER, state: { selectedItems } });
  };

  const hasSelectedItems = getSelectedItems().length > 0;

  const totalPrice = cart
    .filter(item => item.isSelected)
    .reduce((acc, cartItem) => acc + Number(cartItem.price) * Number(cartItem.quantity), 0);

  const cartItemList = cart.map(cartItem => (
    <Styled.CartItemWrapper key={cartItem.productId}>
      <CartItem
        thumbnail={cartItem.thumbnail}
        name={cartItem.name}
        price={getMoneyString(Number(cartItem.price) * Number(cartItem.quantity))}
        quantity={cartItem.quantity}
        setQuantity={quantity => changeCartItemQuantity(cartItem.productId, quantity)}
        isSelected={cartItem.isSelected}
        setSelected={() => selectCartItem(cartItem.productId)}
        onDeleteCartItem={() => onDeleteCartItem(cartItem.productId)}
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
              <Styled.DeleteButton onClick={onSelectedCartItemDelete} disabled={!hasSelectedItems}>
                상품삭제
              </Styled.DeleteButton>
            </Styled.ControlWrapper>
            <Styled.CartHeaderWrapper>
              <Styled.CartHeader>배송상품 ({cart.length}개)</Styled.CartHeader>
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
            isPayButtonDisabled={!hasSelectedItems}
          />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ShoppingCartPage>
  );
};

export default ShoppingCartPage;
