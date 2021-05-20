import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import snakeToCamel from 'utils/snakeToCamel';
import * as T from 'types';
import api from 'api';
import Styled from './OrderListPage.styles';

const OrderListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();
  const addCartItem = useAddCartItem();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<T.Order[]>([]);

  const getOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('customers/zigsong/orders');
      setOrders(snakeToCamel(response.data));
    } catch (error) {
      enqueueSnackbar(MESSAGE.GET_ORDERS_FAILURE);
    }

    setLoading(false);
  }, [enqueueSnackbar]);

  const handleClickCart = (orderItem: T.OrderItem) => {
    const product: T.Product = { ...orderItem };
    addCartItem(product);
  };

  const handleClickDetail = useCallback(
    (order: T.Order) => {
      history.push({
        pathname: '/order/detail',
        state: { order },
      });
    },
    [history]
  );

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await getOrders();
    };
    fetchData();
  }, [getOrders]);

  if (isLoading) {
    return (
      <Styled.SpinnerWrapper>
        <Spinner />
      </Styled.SpinnerWrapper>
    );
  }

  return (
    <Styled.Root>
      <PageHeader title="주문 목록" />
      <Styled.OrderList>
        {orders.map((order) => (
          <Styled.Order key={order.orderId}>
            <Styled.OrderHeader>
              <Styled.OrderNumber>주문번호 : {order.orderId}</Styled.OrderNumber>
              <Styled.DetailButton onClick={() => handleClickDetail(order)}>{'상세보기 >'}</Styled.DetailButton>
            </Styled.OrderHeader>
            <Styled.PurchasedList>
              {order.orderDetails.map((item) => (
                <PurchasedItem key={item.productId} item={item} onClick={handleClickCart} />
              ))}
            </Styled.PurchasedList>
          </Styled.Order>
        ))}
      </Styled.OrderList>
    </Styled.Root>
  );
};

export default OrderListPage;
