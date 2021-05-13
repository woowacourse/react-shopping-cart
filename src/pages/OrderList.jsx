import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../constants/color';
import { useSelector } from 'react-redux';
import { PageTitle, OrderListItem, SelectedProductList, Loading, SELECTED_PRODUCT_LIST_TYPE } from '../components';

const OrderItemListWrapper = styled.li`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 76px;
  border-bottom: none;
`;

const OrderList = () => {
  const { loading, data: orderItemList } = useSelector((state) => state.orderList.orderItemList);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <ul>
        {orderItemList.map((orderItem) => (
          <OrderItemListWrapper key={orderItem.orderNumber}>
            <SelectedProductList
              type={SELECTED_PRODUCT_LIST_TYPE.ORDER_LIST}
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
