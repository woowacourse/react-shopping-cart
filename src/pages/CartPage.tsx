import CartList from 'components/Cart/CartList';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { LOCAL_BASE_URL } from 'apis';
import { useFetch } from 'hooks/useFetch';
import { Item } from 'types/domain';
import styled from 'styled-components';
import PaymentsAmount from 'components/Cart/PaymentsAmount';

const CartPage = () => {
  const {
    data: cartList,
    error: errorGetCartList,
    loading: loadingGetCartList,
  } = useAppSelector(state => state.cartListReducer);
  const dispatch = useAppDispatch<CartListAction>();

  const [paymentsAmount, setpaymentsAmount] = useState(0);

  const cartListString =
    `${LOCAL_BASE_URL}/itemList?` +
    cartList
      .map(item => {
        return `id=${item.id}`;
      })
      .join('&');

  const {
    data: cartDetail,
    loading: loadingGetCartDetail,
    error: errorGetCartDetail,
  }: { data: Item[]; loading: boolean; error: string } = useFetch(cartListString);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  if (loadingGetCartDetail) return <Loading></Loading>;
  if (errorGetCartList || errorGetCartDetail) return <RequestFail />;

  const cartListWithDetail = cartList.map(
    (cartItem, idx) =>
      new Object({ ...cartItem, ...cartDetail.filter(detail => detail.id === cartItem.id)[0] })
  );

  return (
    <>
      <StyledRoot>
        <StyledHeader>장바구니</StyledHeader>
        <CartList
          cartList={cartList}
          cartDetail={cartDetail}
          cartListWithDetail={cartListWithDetail}
          setPaymentsAmount={setpaymentsAmount}
        >
          {loadingGetCartList && <Loading></Loading>}
        </CartList>
        <PaymentsAmount>{paymentsAmount}원</PaymentsAmount>
      </StyledRoot>
    </>
  );
};

const StyledRoot = styled.div`
  display: grid;
  grid-template-areas:
    'hd hd'
    'cl pa';
`;

const StyledHeader = styled.div`
  grid-area: hd;
  text-align: center;
  border-bottom: 4px solid #333333;
  margin-bottom: 53px;
  padding: 29px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;
`;

export default CartPage;
