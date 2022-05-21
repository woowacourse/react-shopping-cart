import CartList from 'components/Cart/CartList';
import LayoutWithTitle from 'components/common/LayoutWithTitle';
import Loading from 'components/common/Loading';
import PaymentBox from 'components/common/PaymentBox';
import RequestFail from 'components/common/RequestFail';
import useThunkFetch from 'hooks/useThunkFetch';
import { getCartListRequest } from 'redux/cartList/thunk';
import { getItemList } from 'redux/itemList/thunk';
import styled from 'styled-components';

const Cart = () => {
  const {
    data: itemList,
    error: itemListError,
    loading: loading_getItemList,
  } = useThunkFetch(state => state.itemListReducer, getItemList);
  const {
    data: cartList,
    error: cartListError,
    loading_getCartList,
  } = useThunkFetch(state => state.cartListReducer, getCartListRequest);

  const itemListInCart = cartList.map(cartItem => {
    const itemInfo = itemList.find(item => item.id === cartItem.id);

    return {
      ...cartItem,
      ...itemInfo,
    };
  });

  const selectedItem = itemListInCart.filter(item => item.isSelected);
  const totalPrice = selectedItem.reduce((acc, item) => item.price * item.quantity + acc, 0);

  if (loading_getCartList || loading_getItemList) return <Loading />;
  if (itemListError || cartListError) return <RequestFail />;

  return (
    <LayoutWithTitle title='장바구니'>
      <StyledMain>
        <CartList itemList={itemListInCart} cartList={cartList} />
        <PaymentBox
          title='결제예샹금액'
          priceDescription='결제예샹금액'
          price={totalPrice}
          buttonText={`주문하기 (${selectedItem.length}개)`}
          style={{ position: 'sticky', top: '50%' }}
        />
      </StyledMain>
    </LayoutWithTitle>
  );
};

export default Cart;

const StyledMain = styled.main`
  display: flex;
  gap: 15.7rem;
`;
