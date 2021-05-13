import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../constants/color';
import { API_PATH } from '../constants/api';
import { requestGetItemList } from '../modules/utils/request';
import useFetch from '../hooks/useFetch';
import { PageTitle, OrderListItem, SelectedProductList, Loading, SELECTED_PRODUCT_LIST_TYPE } from '../components';

const OrderItemListWrapper = styled.li`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 76px;
  border-bottom: none;
`;

const OrderList = () => {
  const { isLoading, data: orderItemList } = useFetch({
    fetchFunc: () => requestGetItemList(API_PATH.ORDER_ITEM_LIST),
    isSetData: true,
  });

  if (isLoading) {
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
