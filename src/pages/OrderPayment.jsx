import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { insertOrderItemList } from '../modules/orderList';
import { deleteCheckedShoppingCartList } from '../modules/shoppingCart';
import { OrderListItem } from '../components';
import { PageTitle } from '../components';
import { PaymentAmount, PAYMENT_AMOUNT_TYPE } from '../components';
import { SelectedProductList, SELECTED_PRODUCT_LIST_TYPE } from '../components';
import { PATH } from '../constants/path';

const Content = styled.section`
  position: relative;
  display: flex;
  margin-top: 25px;
  padding: 0 18px;
  gap: 100px;
`;

const OrderPaymentAmountWrapper = styled.div`
  position: sticky;
  margin-top: 50px;
  top: 50px;
`;

const OrderPayment = () => {
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { orderPaymentList: orderItemList, totalPrice } = state;

  const handleOrderListPageRouter = async () => {
    await dispatch(insertOrderItemList(orderItemList));
    await dispatch(deleteCheckedShoppingCartList(orderItemList));

    history.push(PATH.ORDER_LIST);
  };

  return (
    <>
      <PageTitle>주문/결제</PageTitle>
      <Content>
        <div>
          <SelectedProductList
            type={SELECTED_PRODUCT_LIST_TYPE.ORDER_PAYMENT}
            productList={orderItemList}
            ListItem={OrderListItem}
          />
        </div>
        <div>
          <OrderPaymentAmountWrapper>
            <PaymentAmount
              type={PAYMENT_AMOUNT_TYPE.ORDER_PAYMENT}
              price={totalPrice}
              onClick={handleOrderListPageRouter}
            />
          </OrderPaymentAmountWrapper>
        </div>
      </Content>
    </>
  );
};

export default OrderPayment;
