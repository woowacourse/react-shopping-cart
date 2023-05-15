import { CartCount } from './CartCount';
import { useState } from 'react';
import { CartButtonImage } from '../types/image';
import * as Styled from './styles/CartButton.styles';

interface CartButtonProps {
  handleAddCartState: () => void;
  handleDeleteCartState: () => void;
  id: number;
}

export const CartButton = ({
  handleAddCartState,
  handleDeleteCartState,
  id,
}: CartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleCart = () => {
    setIsAdded(true);
    handleAddCartState();
  };

  const handleDeleteCart = () => {
    setIsAdded(false);
    handleDeleteCartState();
  };

  if (isAdded) return <CartCount id={id} onDeleteCart={handleDeleteCart} />;

  return (
    <Styled.CartButtonImageWrapper>
      <CartButtonImage onClick={handleCart} />
    </Styled.CartButtonImageWrapper>
  );
};
