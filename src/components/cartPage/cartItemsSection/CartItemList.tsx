import styled from 'styled-components';
import { CartItem } from './CartItem';
import { Product } from '../../../types/Product';
import { memo } from 'react';

interface CartItemType {
  id: number;
  quantity: number;
  product: Product;
}

interface CartProductListProps {
  cartItemList: CartItemType[];
}

export const CartItemList = memo(({ cartItemList }: CartProductListProps) => {
  return (
    <Style.Container>
      {cartItemList.map((cartItem) => {
        return <CartItem key={cartItem.id} {...cartItem.product} />;
      })}
    </Style.Container>
  );
});

const Style = {
  Container: styled.ul`
    width: 740px;
    height: max-content;

    display: flex;
    flex-direction: column;
  `,
};
