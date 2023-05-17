import styled from 'styled-components';
import CartProductCard from './CartProductCard/CartProductCard';
import { useRecoilValue } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import { Product } from 'types/product';

type CartProductCardListProps = {
  toggleCheck: (id: Product['id']) => void;
  isChecked: (id: Product['id']) => boolean;
};

const CartProductCardList = ({ toggleCheck, isChecked }: CartProductCardListProps) => {
  const cartProducts = useRecoilValue(cartProductsState);

  return (
    <CartProductFlex>
      {[...cartProducts.entries()].map(([id, cartProduct]) => (
        <CartProductCard key={id} cartProduct={cartProduct} toggleCheck={toggleCheck} isChecked={isChecked} />
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
