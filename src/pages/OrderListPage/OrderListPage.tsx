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
import { addCartItemRequest, getCartItemsRequest } from '../../modules/cartItems/actions';
import { CartState } from '../../modules/cartItems/reducers';
import { RootState } from '../../modules';
import useAxios from '../../hooks/useAxios';

const OrderListPage = (): ReactElement => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  const [{ data: orders, status, error }, fetchOrders] = useAxios('/orders');

  const handleClickCart = (product: T.Product) => {
    if (status !== T.AsyncStatus.SUCCESS || cartItems.status !== T.AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data?.map?.((cartItem) => cartItem.product.id);

    if (cartItemIds.includes(product.id)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItemRequest(product))
      .then(() => {
        enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message);
      });
  };

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    const getOrders = async () => {
      await fetchOrders();
    };
    getOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(MESSAGE.GET_ORDERS_FAILURE);
    }
  }, [enqueueSnackbar, error]);

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
            <Styled.Order key={order.id}>
              <Styled.OrderHeader>
                <Styled.OrderNumber>주문번호 : {order.id}</Styled.OrderNumber>
                <Styled.DetailButton>{'상세보기 >'}</Styled.DetailButton>
              </Styled.OrderHeader>
              <Styled.PurchasedList>
                {order.items?.map?.((item: T.CartItem) => (
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
