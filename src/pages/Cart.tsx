import CartList from 'components/Cart/CartList';
import LayoutWithTitle from 'components/common/LayoutWithTitle';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import useThunkFetch from 'hooks/useThunkFetch';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { getItemList } from 'redux/action-creators/itemListThunk';

const Cart = () => {
  const { data: itemList, error: itemListError } = useThunkFetch(
    state => state.itemListReducer,
    getItemList
  );
  const {
    data: cartList,
    error: cartListError,
    loading_getCartList,
  } = useThunkFetch(state => state.cartListReducer, getCartList);
  const cartIds = cartList.map(item => item.id);
  const itemListInCart = itemList.filter(el => cartIds.includes(el.id));

  if (loading_getCartList) return <Loading />;
  if (itemListError || cartListError) return <RequestFail />;

  return (
    <LayoutWithTitle title='장바구니'>
      <CartList itemList={itemListInCart} cartList={cartList} />
    </LayoutWithTitle>
  );
};

export default Cart;
