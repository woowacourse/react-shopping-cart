import React from 'react';
import styled from 'styled-components';
import PageTitle from '../components/pageTitle/PageTitle';
import OrderListItem, { ORDER_LIST_ITEM_TYPE } from '../components/orderListItem/OrderListItem';
import SelectedProductList, { SELECTED_PRODUCT_LIST_TYPE } from '../components/selectedProductList/SelectedProductList';
import { COLOR } from '../constants/color';
import { useSelector } from 'react-redux';

const OrderItemListWrapper = styled.li`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 76px;
  border-bottom: none;
`;

const OrderList = () => {
  const orderItemList = useSelector((state) => state.orderList.orderItemList);

  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <ul>
        {orderItemList.map((orderItem) => (
          <OrderItemListWrapper key={orderItem.orderNumber}>
            <SelectedProductList
              listType={SELECTED_PRODUCT_LIST_TYPE.ORDER_LIST}
              itemType={ORDER_LIST_ITEM_TYPE.ORDER_LIST}
              productList={orderItem.itemList}
              orderNumber={orderItem.orderNumber}
              ListItem={OrderListItem}
            />
          </OrderItemListWrapper>
        ))}
      </ul>
    </>
  );
};

export default OrderList;
