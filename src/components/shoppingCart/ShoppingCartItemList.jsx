import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import PropTypes from 'prop-types';
import ShoppingCartItem from './ShoppingCartItem';

const Header = styled.div`
  padding-bottom: 24px;
  border-bottom: 4px solid ${COLOR.GRAY_200};
  font-size: 20px;
`;

const ShoppingCartItemListWrapper = styled.div`
  padding: 24px 0 12px 0;
  border-bottom: 2px solid ${COLOR.GRAY_200};
`;

const ShoppingCartItemList = ({ shoppingCartItemList }) => (
  <>
    <Header>든든배송 상품 {shoppingCartItemList.length}개</Header>
    <ul>
      {shoppingCartItemList.map(({ product_id, cart_id, name, price, image_url, quantity, isChecked }) => {
        return (
          <ShoppingCartItemListWrapper key={cart_id ?? product_id}>
            <ShoppingCartItem
              cart_id={cart_id}
              image_url={image_url}
              alt={name}
              name={name}
              price={price}
              quantity={quantity}
              isChecked={isChecked}
            />
          </ShoppingCartItemListWrapper>
        );
      })}
    </ul>
  </>
);

ShoppingCartItemList.propTypes = {
  shoppingCartItemList: PropTypes.arrayOf(
    PropTypes.shape({
      cart_id: PropTypes.number,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      isChecked: PropTypes.bool,
    }).isRequired
  ).isRequired,
};

export default ShoppingCartItemList;
