import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import Division from 'components/common/Division';
import useCartRequest from 'hooks/useCartRequest';
import React from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import { CartItem, Item } from 'types/domain';

import CartItemContainer from './CartItemContainer';

interface CartListProps {
  itemList: Item[];
  cartList: CartItem[];
}

const CartList = ({ itemList, cartList }: CartListProps) => {
  const { updateCartItemQuantity, patchCartItemSelected, patchAllCartItemSelected } =
    useCartRequest(cartList);
  const isAllSelected = cartList.every(item => item.isSelected);

  return (
    <StyledRoot>
      <StyledTop>
        <StyledRight>
          <CheckBox
            id='check'
            checked={isAllSelected}
            onChange={() => patchAllCartItemSelected(isAllSelected)}
          />
          <label htmlFor='check'>선택해제</label>
        </StyledRight>
        <Button width='117px' height='50px' borderColor={theme.colors.font2}>
          상품삭제
        </Button>
      </StyledTop>
      <StyledCount>든든배송 상품 ({itemList.length}개)</StyledCount>
      <Division margin='20px 0' height='4px' color={theme.colors.divisionLine} />
      {itemList.map((item, index) => (
        <React.Fragment key={item.id}>
          <CartItemContainer
            item={item}
            cartItem={cartList[index]}
            handleClickCheckBox={patchCartItemSelected(item.id)}
            handleQuantity={updateCartItemQuantity(item.id)}
          />
          {itemList.length !== index + 1 && (
            <Division color={theme.colors.cartDivision} height='2px' margin='0 0 26px' />
          )}
        </React.Fragment>
      ))}
    </StyledRoot>
  );
};

export default CartList;

const StyledRoot = styled.div``;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.6rem;
  font-size: 1.6rem;
`;

const StyledCount = styled.p`
  font-size: 2rem;
`;

const StyledRight = styled.div`
  ${flexCenter}
  & > :nth-child(2) {
    margin-left: 12px;
  }
`;
