import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import CheckBox from 'components/@shared/CheckBox/CheckBox.component';
import Image from 'components/@shared/Image/Image.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';
import ChangeQuantityButton from 'components/ChangeQuantityButton/ChangeQuantityButton.component';
import { ReactComponent as TrashCan } from 'assets/images/trashCan.svg';
import { deleteItem, increaseQuantity, decreaseQuantity } from 'redux/actions';

const CartItemContainer = styled(FlexBox).attrs({
  gap: '15px',
})`
  width: 736px;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.colors['GRAY_001']};

  ${TextBox} {
    flex-grow: 1;
  }
`;

function ShoppingCartListItem({ id, thumbnail, name, price, quantity }) {
  const dispatch = useDispatch();

  return (
    <CartItemContainer>
      <CheckBox />
      <Image type="small" src={thumbnail} />
      <TextBox className="product-name" fontSize="small">
        {name}
      </TextBox>
      <FlexBox direction="column" gap="20px" alignItems="flex-end">
        <TrashCan cursor="pointer" onClick={() => dispatch(deleteItem(id))} />
        <ChangeQuantityButton
          quantity={quantity}
          onClickAddProduct={() => {
            dispatch(increaseQuantity(id));
          }}
          onClickReduceProduct={() => {
            dispatch(decreaseQuantity(id));
          }}
        />
        <TextBox className="product-price" fontSize="medium">
          {price.toLocaleString()}원
        </TextBox>
      </FlexBox>
    </CartItemContainer>
  );
}

export default React.memo(ShoppingCartListItem);
