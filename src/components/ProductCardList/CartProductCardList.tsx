import { CartProductCard } from './ProductCard/CartProductCard';
import FlexBox from 'components/@common/FlexBox';
import styled from 'styled-components';
import { flexColumn } from 'styles/mixin';
import { CartProduct } from 'types/product';

type Props = {
  cartProducts: CartProduct[];
};

export const CartProductCardList = ({ cartProducts }: Props) => {
  return (
    <Container>
      {cartProducts.map((cartProduct) => (
        <>
          <CartProductCard key={cartProduct.id} cartProduct={cartProduct} />
          <Line />
        </>
      ))}
    </Container>
  );
};

const Container = styled.div`
  ${flexColumn}
  width: 100%;
  gap: 5px;
`;

const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_3};
  width: 100%;
`;
