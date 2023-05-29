import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import CartProductItem from './CartProductItem';

import { cartProductState } from '../../states/cartProducts';

const CartProductList = () => {
  const cartProducts = useRecoilValue(cartProductState);

  return (
    <CartProductListContainer>
      {cartProducts.map((cartProduct) => (
        <li key={cartProduct.id}>
          <CartProductItem cartProduct={cartProduct} />
        </li>
      ))}
    </CartProductListContainer>
  );
};

const CartProductListContainer = styled.ul`
  & > li {
    padding: 18px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};

    @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
      padding: 30px 0;
    }
  }
`;

export default CartProductList;
