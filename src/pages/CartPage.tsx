import CartList from 'components/Cart/CartList';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { LOCAL_BASE_URL } from 'apis';
import { useFetch } from 'hooks/useFetch';
import { Item } from 'types/domain';
import styled from 'styled-components';
import PaymentsAmount from 'components/Cart/PaymentsAmount';
import CheckBox from 'components/common/CheckBox';

const Cart = () => {
  const { data: cartList, error, loading } = useAppSelector(state => state.cartListReducer);
  const dispatch = useAppDispatch<CartListAction>();

  const cartListString =
    `${LOCAL_BASE_URL}/itemList?` +
    cartList
      .map(item => {
        return `id=${item.id}`;
      })
      .join('&');

  const {
    data: cartDetail,
    loading: loading2,
    error: error2,
  }: { data: Item[]; loading: boolean; error: string } = useFetch(cartListString);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  if (loading || loading2) return <Loading />;
  if (error || error2) return <RequestFail />;

  return (
    <>
      <StyledRoot>
        <StyledHeader>장바구니</StyledHeader>
        <CartList cartList={cartList} cartDetail={cartDetail} />
        <PaymentsAmount>55000원</PaymentsAmount>
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

export default Cart;
