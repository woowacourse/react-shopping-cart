import React from 'react';
import { CartItem } from 'types/domain';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import useThunkFetch from 'hooks/useThunkFetch';
import { getCartList } from 'redux/action-creators/cartListThunk';

const CartList = () => {
  const {
    data: cartList,
    error,
    loading,
  } = useThunkFetch(state => state.cartListReducer, getCartList);

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  return (
    <div>
      {cartList.map((item: CartItem) => (
        <React.Fragment key={item.id}>
          <div>id는 {item.id}</div>
          <div>quantity는 {item.quantity}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;
