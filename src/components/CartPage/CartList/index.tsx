import React from 'react';
import { PRODUCT_LIST } from '@mockData/productList';
import { styled } from 'styled-components';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import { CartInformation } from '@type/types';
import { createCartItem } from '@utils/cart';
import { device, theme } from '@styles/theme';
import CartItem from './CartItem';

interface CartListProps {
  cartList: CartInformation[];
}

const CartList = ({ cartList }: CartListProps) => {
  return (
    <Wrapper>
      <GridWrapper>
        {cartList.map((item) => (
          <CartItem quantity={item.quantity} {...item.product} />
        ))}
      </GridWrapper>
      <CheckBoxWrapper>
        <CheckBox isChecked={false} onClick={() => {}} />
        <AllSelectText>전체선택 (2/3)</AllSelectText>
        <Button text="선택삭제" onClick={() => {}} />
      </CheckBoxWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const GridWrapper = styled.div`
  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: repeat(3, minmax(10px, 1fr));
    gap: 20px;

    border-top: 1.5px solid ${theme.colors.whiteGray2};
  }

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: repeat(2, minmax(10px, 1fr));
    gap: 15px;

    border-top: 1.5px solid ${theme.colors.whiteGray2};
  }

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

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
