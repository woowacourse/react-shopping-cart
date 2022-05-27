import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import CheckBox from 'components/@shared/CheckBox/CheckBox.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Image from 'components/@shared/Image/Image.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import ChangeQuantityButton from 'components/ChangeQuantityButton/ChangeQuantityButton.component';

import { addSpecificItem, deleteSpecificItem } from 'redux/actions/orderList.action';
import { deleteItem, increaseQuantity, decreaseQuantity } from 'redux/actions/shoppingCart.action';

import { ReactComponent as TrashCan } from 'assets/images/trashCan.svg';

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

function ShoppingCartListItem({ id, name, thumbnail, price, quantity }) {
  const dispatch = useDispatch();
  const orderList = useSelector(state => state.orderList);
  const checked = useMemo(() => orderList.some(productId => productId === id), [orderList, id]);

  const handleChangeCheckBox = id => {
    const toggleItemAction = checked ? deleteSpecificItem : addSpecificItem;

    dispatch(toggleItemAction(id));
  };

  const itemDeleteConfirm = id => {
    if (window.confirm(`${name}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      dispatch(deleteItem(id));
      dispatch(deleteSpecificItem(id));
    }
  };

  return (
    <CartItemContainer>
      <CheckBox checked={checked} onChange={() => handleChangeCheckBox(id)} />
      <Image type="small" src={thumbnail} />
      <TextBox className="product-name" fontSize="small">
        {name}
      </TextBox>
      <FlexBox direction="column" gap="20px" alignItems="flex-end">
        <TrashCan cursor="pointer" onClick={() => itemDeleteConfirm(id)} />
        <ChangeQuantityButton
          quantity={quantity}
          onClickAddProduct={() => dispatch(increaseQuantity(id))}
          onClickReduceProduct={() => dispatch(decreaseQuantity(id))}
        />
        <TextBox className="product-price" fontSize="medium">
          {price.toLocaleString()}원
        </TextBox>
      </FlexBox>
    </CartItemContainer>
  );
}

export default React.memo(ShoppingCartListItem);
