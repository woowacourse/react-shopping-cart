import React from 'react';
import { PRODUCT_LIST } from '@mockData/productList';
import { styled } from 'styled-components';
import { createCartItem } from '@utils/cart';
import CartItem from './CartItem';

const bucketList = PRODUCT_LIST.productList.map((item) => createCartItem(item));

const CartList = () => {
  return (
    <div>
      {bucketList.map((item) => (
        <CartItem quantity={item.quantity} {...item.product} />
      ))}
    </div>
  );
};

export default CartList;
