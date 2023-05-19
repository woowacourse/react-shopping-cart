import styled from 'styled-components';
import { ProductSelectItem } from './CartProductItem';
import { Product } from '../../../types/Product';

interface CartProductListType {
  id: number;
  quantity: number;
  product: Product;
}

interface CartProductListProps {
  cartProductList: CartProductListType[];
}

export const CartProductList = ({ cartProductList }: CartProductListProps) => {
  return (
    <Style.Container>
      {cartProductList.map((cartProduct) => {
        return (
          <ProductSelectItem key={cartProduct.id} {...cartProduct.product} />
        );
      })}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    width: 740px;
    height: max-content;

    display: flex;
    flex-direction: column;
  `,
};
