import { CartCount } from './CartCount';
import { useCallback } from 'react';
import { CartButtonImage } from '../types/image';
import * as Styled from './styles/CartButton.styles';
import { useCartState } from './hooks/useCartState';

interface CartButtonProps {
  id: number;
}

export const CartButton = ({ id }: CartButtonProps) => {
  const {
    quantity,
    handleAddCartState,
    handleDeleteCartState,
    increaseProductCount,
    decreaseProductCount,
  } = useCartState(id);

  const handleCart = useCallback(() => {
    handleAddCartState();
  }, []);

  const handleDeleteCart = useCallback(() => {
    handleDeleteCartState();
  }, []);

  if (quantity > 0)
    return (
      <CartCount
        quantity={quantity}
        handleDeleteCart={handleDeleteCart}
        increaseProductCount={increaseProductCount}
        decreaseProductCount={decreaseProductCount}
      />
    );

  return (
    <Styled.CartButtonImageWrapper>
      <CartButtonImage onClick={handleCart} />
    </Styled.CartButtonImageWrapper>
  );
};
