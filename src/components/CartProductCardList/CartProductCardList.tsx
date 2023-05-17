import styled from 'styled-components';
import CartProductCard from './CartProductCard/CartProductCard';
import { useRecoilValue } from 'recoil';
import { cartProductsState } from 'state/cartProducts';

const CartProductCardList = () => {
  const cartProducts = useRecoilValue(cartProductsState);

  return (
    <CartProductFlex>
      {[...cartProducts.entries()].map(([id, cartProduct]) => (
        <CartProductCard key={id} cartProduct={cartProduct} />
      ))}
    </CartProductFlex>
  );
};

export default CartProductCardList;

const CartProductFlex = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
