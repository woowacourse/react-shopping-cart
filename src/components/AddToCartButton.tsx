import { useState } from 'react';
import { AddToCartButtonImage } from '../types/image';
import { AddToCartCount } from './AddToCartCount';

export const AddToCartButton = ({
  handleAddCartState,
  handleDeleteCartState,
  id,
}: {
  handleAddCartState: () => void;
  handleDeleteCartState: () => void;
  id: number;
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    handleAddCartState();
  };

  const handleDeleteCart = () => {
    setIsAdded(false);
    handleDeleteCartState();
  };

  return (
    <>
      {isAdded ? (
        <AddToCartCount id={id} onDeleteCart={handleDeleteCart} />
      ) : (
        <AddToCartButtonImage onClick={handleAddToCart} />
      )}
    </>
  );
};
