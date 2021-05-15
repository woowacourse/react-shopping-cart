import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useSnackbar } from 'notistack';
import PageHeader from 'components/shared/PageHeader/PageHeader';
import PurchasedItem from 'components/units/PurchasedItem/PurchasedItem';
import Spinner from 'components/shared/Spinner/Spinner';
import MESSAGE from 'constants/messages';
import { RootState } from 'modules';
import { getCartItemsRequest } from 'modules/cartItems/actions';
import useAddCartItem from 'hooks/useAddCartItem';
import * as T from 'types';
import api from 'api';
import Styled from './OrderListPage.styles';

const OrderListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();
  const addCartItem = useAddCartItem();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<T.Order[]>([]);

  const getOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      enqueueSnackbar(MESSAGE.GET_ORDERS_FAILURE);
    }

    setLoading(false);
  }, [enqueueSnackbar]);

  const handleClickCart = (product: T.Product) => {
    addCartItem(product);
  };

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await getOrders();
    };
    fetchData();
  }, [getOrders]);

  return (
    <Styled.Root>
      <PageHeader title="주문 목록" />
      {isLoading ? (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      ) : (
        <Styled.OrderList>
          {orders.map((order) => (
            <Styled.Order key={order.id}>
              <Styled.OrderHeader>
                <Styled.OrderNumber>주문번호 : {order.id}</Styled.OrderNumber>
                <Styled.DetailButton>{'상세보기 >'}</Styled.DetailButton>
              </Styled.OrderHeader>
              <Styled.PurchasedList>
                {order.items.map((item) => (
                  <PurchasedItem key={item.id} item={item} onClick={handleClickCart} />
                ))}
              </Styled.PurchasedList>
            </Styled.Order>
          ))}
        </Styled.OrderList>
      )}
    </Styled.Root>
  );
};

export default OrderListPage;
