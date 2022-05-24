import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Image from 'components/@shared/Image/Image.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import { addItem, deleteItem } from 'redux/actions/shoppingCart.action';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

const ItemContainer = styled.div`
  display: grid;
  gap: 5px;
  width: 282px;
  grid-template-areas:
    'img img'
    'name icon'
    'price icon';

  ${Image} {
    grid-area: img;
  }
  ${TextBox}.product-name {
    grid-area: name;
    margin-left: 11px;
    margin-top: 5px;
  }
  ${TextBox}.product-price {
    grid-area: price;
    margin-left: 11px;
  }

  svg {
    grid-area: icon;
    place-self: center end;
    margin-right: 11px;
  }

  path {
    fill: ${({ theme, isContained }) =>
      isContained ? theme.colors['MINT_001'] : theme.colors['BLACK_001']};
  }
`;

function ProductListItem({ id, thumbnail, name, price }) {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart);

  const isContained = shoppingCart.find(itemInfo => itemInfo.id === id) !== undefined;

  const onClick = () => dispatch(isContained ? deleteItem(id) : addItem(id));

  return (
    <ItemContainer isContained={isContained}>
      <Image type="medium" src={thumbnail} />
      <TextBox className="product-name" fontSize="small">
        {name}
      </TextBox>
      <TextBox className="product-price" fontSize="medium">
        {price.toLocaleString()}원
      </TextBox>
      <ShoppingCart role="button" style={{ cursor: 'pointer' }} onClick={onClick} />
    </ItemContainer>
  );
}

export default React.memo(ProductListItem);
