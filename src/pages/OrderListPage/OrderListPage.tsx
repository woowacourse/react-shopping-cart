import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PurchasedItem from '../../components/units/PurchasedItem/PurchasedItem';
import Spinner from '../../components/shared/Spinner/Spinner';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';
import api from '../../api';
import Styled from './OrderListPage.styles';
import { addCartItemRequest, getCartItemsRequest } from '../../modules/cartItems/actions';
import { CartState } from '../../modules/cartItems/reducers';
import { RootState } from '../../modules';
import API from '../../constants/api';
import { toCamelCaseKeyObjectArray } from '../../utils';

const OrderListPage = () => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<T.Order[]>([]);

  const getOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get(API.ORDERS);

      const fetchedOrders = toCamelCaseKeyObjectArray(response.data);
      const serializedOrders = fetchedOrders.map((order: T.Order) => ({
        ...order,
        orderDetails: toCamelCaseKeyObjectArray(order.orderDetails),
      }));

      setOrders(serializedOrders);
    } catch (error) {
      enqueueSnackbar(MESSAGE.GET_ORDERS_FAILURE);
    }

    setLoading(false);
  }, [enqueueSnackbar]);

  const handleClickCart = (productId: T.Product['productId']) => {
    if (isLoading || cartItems.status !== T.AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data?.map?.((cartItem) => cartItem.productId);

    if (cartItemIds.includes(productId)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItemRequest(productId))
      .then(() => {
        enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((error: Error) => {
        enqueueSnackbar(error.message);
      });
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
      {isLoading && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}

      {!isLoading && orders.length <= 0 ? (
        <Styled.NoResultMessage>📋 주문한 내역이 없어요!</Styled.NoResultMessage>
      ) : (
        <Styled.OrderList>
          {orders?.map?.((order) => (
            <Styled.Order key={order.orderId}>
              <Styled.OrderHeader>
                <Styled.OrderNumber>주문번호 : {order.orderId}</Styled.OrderNumber>
                <Styled.DetailButton>{'상세보기 >'}</Styled.DetailButton>
              </Styled.OrderHeader>
              <Styled.PurchasedList>
                {order.orderDetails?.map?.((item) => (
                  <PurchasedItem key={`${order.orderId}-${item.productId}`} item={item} onClick={handleClickCart} />
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
