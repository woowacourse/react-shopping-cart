import { AddToCartCount } from './AddToCartCount';
import { useCallback, useState } from 'react';
import { AddToCartButtonImage } from '../types/image';
import * as Styled from './styles/AddToCartButton.styles';

interface AddToCartButtonProps {
  handleAddCartState: () => void;
  handleDeleteCartState: () => void;
  id: number;
}

export const AddToCartButton = ({
  handleAddCartState,
  handleDeleteCartState,
  id,
}: AddToCartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = useCallback(() => {
    setIsAdded(true);
    handleAddCartState();
  }, []);

  const handleDeleteCart = useCallback(() => {
    setIsAdded(false);
    handleDeleteCartState();
  }, []);

  if (isAdded)
    return <AddToCartCount id={id} onDeleteCart={handleDeleteCart} />;

  return (
    <Styled.AddToCartButtonImageWrapper>
      <AddToCartButtonImage onClick={handleAddToCart} />
    </Styled.AddToCartButtonImageWrapper>
  );
};
