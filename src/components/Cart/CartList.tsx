import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import Division from 'components/common/Division';
import useCartRequest from 'hooks/useCartRequest';
import React from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import { CartItem, ItemInCart } from 'types/domain';

import CartItemContainer from './CartItemContainer';

interface CartListProps {
  itemList: ItemInCart[];
  cartList: CartItem[];
}

const CartList = ({ itemList, cartList }: CartListProps) => {
  const {
    updateCartItemQuantity,
    selectCartItem,
    selectAllCartItem,
    deleteCartItem,
    deleteAllCartItem,
  } = useCartRequest(cartList);
  const isAllSelected = itemList.every(item => item.isSelected);
  const totalItemCount = itemList.length;

  const handleClickAllDeleteButton = () => {
    if (window.confirm('모든 상품을 삭제하시겠습니까?')) {
      deleteAllCartItem();
    }
  };

  console.log('itemList', itemList);

  return (
    <StyledRoot>
      <StyledTop>
        <StyledRight>
          <CheckBox
            id='check'
            checked={isAllSelected}
            disabled={!totalItemCount}
            onChange={() => selectAllCartItem(isAllSelected)}
          />
          <label htmlFor='check'>선택해제</label>
        </StyledRight>
        <Button
          width='117px'
          height='50px'
          borderColor={theme.colors.font2}
          onClick={handleClickAllDeleteButton}
        >
          상품삭제
        </Button>
      </StyledTop>
      <StyledCount>든든배송 상품 ({totalItemCount}개)</StyledCount>
      <Division margin='20px 0' height='4px' color={theme.colors.divisionLine} />
      {itemList?.map((item, index) => (
        <React.Fragment key={item.id}>
          <CartItemContainer
            item={item}
            selectItem={selectCartItem(item.id)}
            changeQuantity={updateCartItemQuantity(item.id)}
            deleteItem={deleteCartItem(item.id)}
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

const StyledRoot = styled.div`
  width: 73.5rem;
`;

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
