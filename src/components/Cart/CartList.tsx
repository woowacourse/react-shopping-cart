import { ReactComponent as DeleteIcon } from 'assets/deleteIcon.svg';
import CroppedImage from 'components/common/CroppedImage';
import Division from 'components/common/Division';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { CartItem, Item } from 'types/domain';

import QuantityBox from './QuantityBox';

interface CartListProps {
  itemList: Item[];
  cartList: CartItem[];
}

const CartList = ({ itemList, cartList }: CartListProps) => {
  const { updateCartItemQuantity } = useUpdateCartItem(cartList);

  return (
    <div>
      {itemList.map(({ id, thumbnailUrl, title, price }, index) => (
        <React.Fragment key={id}>
          <StyledCartItem>
            <input type='checkbox' />
            <CroppedImage src={thumbnailUrl} width='144px' height='144px' alt={title} />
            <p>{title}</p>
            <StyledRight>
              <DeleteIcon />
              <QuantityBox
                quantity={cartList[index].quantity}
                handleChange={updateCartItemQuantity(id)}
              />
              <p>{price.toLocaleString()}원</p>
            </StyledRight>
          </StyledCartItem>
          {itemList.length !== index + 1 && (
            <Division color={theme.colors.cartDivision} height='2px' margin='0 0 26px' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;

const StyledCartItem = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.font};
  width: 735px;
  height: 181px;

  & > p {
    font-size: 20px;
    flex: 1;
  }

  & > :nth-of-type(1) {
    margin-left: 10px;
  }
  & > :nth-of-type(2) {
    margin-left: 15px;
  }
`;

const StyledRight = styled.div`
  & > p {
    font-size: 16px;
  }
`;
