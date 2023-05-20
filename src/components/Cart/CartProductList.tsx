import styled from 'styled-components';

import CartProductItem from './CartProductItem';
import { useRecoilValue } from 'recoil';
import { cartProductAtom } from '../../recoil/cartProductData';

const CartProductList = () => {
  const cartProducts = useRecoilValue(cartProductAtom);

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
    padding: 33px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

export default CartProductList;
