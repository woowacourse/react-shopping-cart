import { useState } from 'react';
import { AddToCartButtonImage } from '../types/image';
import { AddToCartCount } from './AddToCartCount';
import { useSetRecoilState } from 'recoil';
import { addedCartState } from '../atoms/AddedCartState';

export const AddToCartButton = () => {
  const [isAdded, setIsAdded] = useState(false);
  const setAddedCartState = useSetRecoilState(addedCartState);

  const handleAddToCart = () => {
    setIsAdded(true);
    setAddedCartState((prev) => prev + 1);
  };

  const handleDeleteCart = () => {
    setIsAdded(false);
    setAddedCartState((prev) => prev - 1);
  };

  return (
    <>
      {isAdded ? (
        <AddToCartCount onDeleteCart={handleDeleteCart} />
      ) : (
        <AddToCartButtonImage onClick={handleAddToCart} />
      )}
    </>
  );
};
