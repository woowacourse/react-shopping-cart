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
    <div>
      <CartList cartList={cartList} cartDetail={cartDetail} />
    </div>
  );
};

export default Cart;
