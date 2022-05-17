import styled from 'styled-components';

import ShoppingCartItem from 'components/ShoppingCartItem/ShoppingCartItem';

import { ColumnFlexWrapper } from 'styles/Wrapper';

const ShoppingCartItemBox = styled(ColumnFlexWrapper)``;

function ShoppingCartItemsContainer({ carts }) {
  return (
    <ShoppingCartItemBox>
      {carts.map(({ id, name, image, price, checked }) => (
        <ShoppingCartItem
          key={id}
          id={id}
          name={name}
          thumbnail={image}
          price={price}
          checked={checked}
        />
      ))}
    </ShoppingCartItemBox>
  );
}

export default ShoppingCartItemsContainer;
