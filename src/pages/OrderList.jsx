import React from 'react';
import styled from 'styled-components';
import PageTitle from '../components/pageTitle/PageTitle';
import OrderListItem, { TYPE as ORDER_LIST_ITEM_TYPE } from '../components/orderListItem/OrderListItem';
import SelectedProductList, {
  TYPE as SELECTED_PRODUCT_LIST_TYPE,
} from '../components/selectedProductList/SelectedProductList';
import { COLOR } from '../constants/color';

const Content = styled.div`
  border: 2px solid ${COLOR.GRAY_200};
  border-bottom: none;
`;

// TODO: background color GRAY-400
const OrderList = ({ productListState }) => (
  <>
    <PageTitle>주문목록</PageTitle>
    <Content>
      <SelectedProductList
        listType={SELECTED_PRODUCT_LIST_TYPE.ORDER_LIST}
        itemType={ORDER_LIST_ITEM_TYPE.ORDER_LIST}
        productList={productListState}
        ListItem={OrderListItem}
      />
    </Content>
  </>
);

export default OrderList;
