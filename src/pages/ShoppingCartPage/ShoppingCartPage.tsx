import { useState } from 'react';
import { useHistory } from 'react-router';
import Checkbox from '../../components/commons/Checkbox/Checkbox';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import CartListItem from '../../components/ShoppingCartPage/CartListItem/CartListItem';
import { STATUS_CODE, PATH } from '../../constants';
import useCart from '../../hooks/useCart';
import { getMoneyString } from '../../utils/format';
import * as Styled from './ShoppingCartPage.styles';
import { confirm } from '../../utils/confirm';
import { requestDeleteCartItem } from '../../apis';
import { alert } from '../../utils/alert';
import { requestDeleteCartItems } from '../../apis/cart';
import { CartItem } from '../../type';

const ShoppingCartPage = () => {
  const history = useHistory();
  const { cartItems, loading, responseOK, setCartItems } = useCart();
  const [isTotalChecked, setTotalChecked] = useState(true);

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

  const setCartItemQuantity = async (id: CartItem['id'], quantity: CartItem['quantity']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const newCartItem = { ...newCartItems[targetIndex], quantity };
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
    const targetCartItem = newCartItems[targetIndex];
    if (!confirm(`${targetCartItem.name}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await requestDeleteCartItem(id);
      newCartItems.splice(targetIndex, 1);
      setCartItems(newCartItems);
    } catch (error) {
      alert(`${targetCartItem.name}을(를) 장바구니에서 삭제하는데 실패했습니다!`);
    }
  };

  const onSelectedCartItemDelete = async () => {
    if (cartItems.length === 0) {
      return;
    }

    if (!confirm('선택된 모든 상품들을 장바구니에서 삭제하시겠습니까?')) {
      return;
    }

    try {
      const selectedCartItemIdList = cartItems.filter(item => item.isSelected).map(item => item.id);
      await requestDeleteCartItems(selectedCartItemIdList);
      const newCartItems = cartItems.filter(cartItem => !selectedCartItemIdList.includes(cartItem.id));
      setCartItems(newCartItems);
    } catch (error) {
      const failCount = error.statusList?.filter((status: number) => status !== STATUS_CODE.POST_SUCCESS);
      alert(`${failCount}개의 상품들을 장바구니에서 삭제하는데 실패했습니다!`);
    }
  };

  // 어라 이거 프로덕트 아이디가 똑같아서 생기는 문제 같은데
  // 업데이트 되는건 문제가 있네

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

  const totalPrice = String(
    cartItems.reduce((acc, cartItem) => {
      if (!cartItem.isSelected) {
        return acc;
      }

      return acc + Number(cartItem.price) * Number(cartItem.quantity);
    }, 0)
  );

  const getSelectedCartItems = () => {
    return cartItems.filter(item => item.isSelected);
  };

  const onOrderLinkButtonClick = () => {
    if (!confirm('선택하신 상품들을 주문하시겠습니까?')) {
      return;
    }
    const selectedCartItems = getSelectedCartItems();
    if (selectedCartItems.length === 0) return;
    history.push({ pathname: PATH.ORDER, state: { selectedCartItems } });
  };

  const isOrderPossible = cartItems.length > 0;

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
            price={getMoneyString(totalPrice)}
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
