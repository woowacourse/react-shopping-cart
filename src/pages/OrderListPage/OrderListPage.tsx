import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PurchasedItem from '../../components/units/PurchasedItem/PurchasedItem';
import Spinner from '../../components/shared/Spinner/Spinner';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';
import api from '../../api';
import Styled from './OrderListPage.styles';
import { addCartItemRequest } from '../../modules/cartItems/actions';
import { CartState } from '../../modules/cartItems/reducers';
import { RootState } from '../../modules';

const OrderListPage = () => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<T.Order[]>([]);

  const getOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      alert(MESSAGE.GET_ORDERS_FAILURE);
    }

    setLoading(false);
  }, []);

  const handleClickCart = (product: T.Product) => {
    if (isLoading) return;

    const cartItemIds = cartItems.data.map((cartItem) => cartItem.product.id);

    if (cartItemIds.includes(product.id)) {
      alert(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItemRequest(product))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then(() => {
        alert(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

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
