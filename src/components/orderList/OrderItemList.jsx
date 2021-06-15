import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 36px;
  font-size: 20px;
  background-color: ${COLOR.GRAY_100};
  border-bottom: 2px solid ${COLOR.GRAY_200};
`;

const OrderItemWrapper = styled.li`
  border-bottom: 2px solid ${COLOR.GRAY_200};
  padding: 38px 0;
`;

const OrderItemList = ({ orderDetailItemList, order_id }) => (
  <>
    <Header>
      <div>주문번호 : {order_id}</div>
      {/* TODO: 주문 상품 상세 페이지 제작용 */}
      {/* <Link to={PATH.ORDER_LIST_DETAIL}>상세보기 {'>'} </Link> */}
    </Header>
    <ul>
      {orderDetailItemList.map(({ product_id, image_url, name, price, quantity }) => {
        return (
          <OrderItemWrapper key={`${order_id}/${product_id}`}>
            <OrderItem product_id={product_id} image_url={image_url} name={name} price={price} quantity={quantity} />
          </OrderItemWrapper>
        );
      })}
    </ul>
  </>
);

OrderItemList.propTypes = {
  orderDetailItemList: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired
  ),
};

export default OrderItemList;
