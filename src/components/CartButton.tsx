import { CartCount } from './CartCount';
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

  if (quantity > 0)
    return (
      <CartCount
        quantity={quantity}
        handleDeleteCart={handleDeleteCartState}
        increaseProductCount={increaseProductCount}
        decreaseProductCount={decreaseProductCount}
      />
    );

  return (
    <Styled.CartButtonImageWrapper>
      <CartButtonImage onClick={handleAddCartState} />
    </Styled.CartButtonImageWrapper>
  );
};
