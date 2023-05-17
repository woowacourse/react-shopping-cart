import { CartCount } from './CartCount';
import { useCallback, useState } from 'react';
import { CartButtonImage } from '../types/image';
import * as Styled from './styles/CartButton.styles';
import { useCartState } from './hooks/useCartState';

interface CartButtonProps {
  id: number;
}

export const CartButton = ({ id }: CartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const {
    quantity,
    handleAddCartState,
    handleDeleteCartState,
    increaseProductCount,
    decreaseProductCount,
  } = useCartState(id);

  const handleCart = useCallback(() => {
    setIsAdded(true);
    handleAddCartState();
  }, []);

  const handleDeleteCart = useCallback(() => {
    setIsAdded(false);
    handleDeleteCartState();
  }, []);

  if (isAdded)
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
