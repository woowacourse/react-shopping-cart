import React from 'react';
import { PRODUCT_LIST } from '@mockData/productList';
import { styled } from 'styled-components';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import { createCartItem } from '@utils/cart';
import { theme } from '@styles/theme';
import CartItem from './CartItem';

const bucketList = PRODUCT_LIST.productList.map((item) => createCartItem(item));

const CartList = () => {
  return (
    <div>
      {bucketList.map((item) => (
        <CartItem quantity={item.quantity} {...item.product} />
      ))}

      <CheckBoxWrapper>
        <CheckBox isChecked={false} onClick={() => {}} />
        <AllSelectText>전체선택 (2/3)</AllSelectText>
        <Button text="선택삭제" onClick={() => {}} />
      </CheckBoxWrapper>
    </div>
  );
};

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;
`;

const AllSelectText = styled.span`
  font-weight: 400;
  font-size: 16px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

export default CartList;
