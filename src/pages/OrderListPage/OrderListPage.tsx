import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PurchasedItem from '../../components/units/PurchasedItem/PurchasedItem';
import Spinner from '../../components/shared/Spinner/Spinner';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';
import Styled from './OrderListPage.styles';
import { addCartItem, getCartItems } from '../../slices/cartSlice';
import { RootState } from '../../store';
import useAxios from '../../hooks/useAxios';
import API from '../../constants/api';

const OrderListPage = (): ReactElement => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  const [{ data: orders, status }, fetchOrders] = useAxios(API.ORDERS);

  const handleClickCart = (productId: T.Product['productId']) => {
    if (status !== T.AsyncStatus.SUCCESS || cartItems.status !== T.AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data.map((cartItem) => cartItem.productId);

    if (cartItemIds.includes(productId)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItem(productId))
      .then(() => {
        dispatch(getCartItems());
        enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message);
      });
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders();
    };
    fetchData();
  }, [fetchOrders]);

  return (
    <Styled.Root>
      <PageHeader title="주문 목록" />
      {status === T.AsyncStatus.PENDING && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}

      {status !== T.AsyncStatus.PENDING && orders?.length === 0 ? (
        <Styled.NoResultMessage>📋 주문한 내역이 없어요!</Styled.NoResultMessage>
      ) : (
        <Styled.OrderList>
          {orders?.map?.((order: T.Order) => (
            <Styled.Order key={order.orderId}>
              <Styled.OrderHeader>
                <Styled.OrderNumber>주문번호 : {order.orderId}</Styled.OrderNumber>
                <Styled.DetailButton>{'상세보기 >'}</Styled.DetailButton>
              </Styled.OrderHeader>
              <Styled.PurchasedList>
                {order.orderDetails?.map?.((item: T.OrderItem) => (
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
