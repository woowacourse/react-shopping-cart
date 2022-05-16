import React, { useCallback } from 'react';
import styled from 'styled-components';
import Image from 'components/@shared/Image/Image.component';
import Text from 'components/@shared/Text/Text.component';
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
  ${Text}.product-name {
    grid-area: name;
    margin-left: 11px;
    margin-top: 5px;
  }
  ${Text}.product-price {
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
      isContained ? theme.usingColor.selectedShoppingCartIcon : theme.usingColor.shoppingCartIcon};
  }
`;

function ProductListItem({ id, thumbnail, name, price, isContained, handleToggleShoppingCart }) {
  const onClick = useCallback(() => handleToggleShoppingCart(id, isContained), [id, isContained]);

  return (
    <ItemContainer isContained={isContained}>
      <Image type="medium" src={thumbnail} />
      <Text className="product-name" fontSize="small">
        {name}
      </Text>
      <Text className="product-price" fontSize="medium">
        {price}원
      </Text>
      <ShoppingCart style={{ cursor: 'pointer' }} onClick={onClick} />
    </ItemContainer>
  );
}

export default React.memo(ProductListItem);
