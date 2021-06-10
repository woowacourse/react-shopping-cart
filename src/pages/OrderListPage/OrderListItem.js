import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import Image from '../../components/utils/Image';
import Flex from '../../components/utils/Flex';
import Button from '../../components/utils/Button';

import { addItemToCartRequest } from '../../modules/cartSlice';

import { COLOR, MESSAGE } from '../../constant';

const OrderListItem = ({ order }) => {
  const dispatch = useDispatch();
  const { cartItemsInServer, errorMessage } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    if (errorMessage) {
      window.alert(errorMessage);
    }
  }, [errorMessage]);

  const OrderList = styled.li`
    width: 100%;
    margin-bottom: 74px;
    border: 1px solid #aaaaaa;
  `;

  const SingleOrderList = styled.ul`
    position: relative;
    height: 220px;
    background-color: #ffffff;
    border-top: 1px solid #aaaaaa;
    display: flex;
    flex-direction: column;
    padding-left: 26px;
  `;

  const OrderListHeader = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    width: 100%;
    height: 92px;
    border-bottom: 1px solid #aaaaaa;
  `;

  const OrderNumber = styled.span`
    color: #333333;
    font-size: 24px;
    margin: 30px 0 0 30px;
  `;

  const SingleProduct = styled.li`
    display: flex;
    height: 500px;
    cursor: pointer;
    margin-top: 37px;

    &:hover .product-image {
      transition: all 0.3s ease-out 0s;
      transform: scale(1.1);
    }
  `;

  const ProductName = styled.span`
    width: 100%;
    font-size: 16px;
    line-height: 22px;
    align-self: start;
    margin: 5px 0 31px 0;
    margin-bottom: 20px;
  `;

  const ProductDetail = styled.span`
    color: #888888;
  `;

  const ProductInfoStyle = css`
    margin-left: 35px;
  `;

  const StyledButton = styled(Button)`
    && {
      position: absolute;
      right: 25px;
      top: 40px;
      width: 140px;
      height: 47px;
      border-radius: 4px;
      font-size: 20px;
      color: ${COLOR.WHITE[400]};
      background-color: ${COLOR.CYAN[400]};
      border: none;

      &:hover {
        cursor: pointer;
        font-weight: 500px;
      }

      &:focus {
        outline: none;
      }
    }
  `;

  const onAddCartButtonClick = (product) => {
    const isCartItemExist = cartItemsInServer && cartItemsInServer.length > 0;
    const isAlreadyInCart = cartItemsInServer.findIndex((item) => item.product_id === product.product_id) !== -1;

    if (isCartItemExist && isAlreadyInCart) return alert(MESSAGE.ALREADY_IN_CART); // 상수처리
    dispatch(addItemToCartRequest(product));
  };

  return (
    <OrderList>
      <OrderListHeader>
        <OrderNumber>{`주문번호: ${order.order_id}`}</OrderNumber>
      </OrderListHeader>
      {order.order_details
        .map((orderDetail) => (
          <SingleOrderList key={orderDetail.name}>
            <SingleProduct>
              <Image
                width="144px"
                height="144px"
                src={orderDetail.image_url}
                alt={orderDetail.name}
                className="product-image"
                isBackgroundImageNeeded={true}
              />
              <Flex flexDirection="column" css={ProductInfoStyle}>
                <ProductName>{orderDetail.name}</ProductName>
                <ProductDetail>{`${orderDetail.price}원 / 수량: ${orderDetail.quantity}개`}</ProductDetail>
              </Flex>
              <StyledButton disabled={false} onClick={() => onAddCartButtonClick(orderDetail)}>
                장바구니
              </StyledButton>
            </SingleProduct>
          </SingleOrderList>
        ))
        .reverse()}
    </OrderList>
  );
};

export default OrderListItem;
