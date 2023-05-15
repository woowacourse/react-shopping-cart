import { AddToCartCount } from './AddToCartCount';
import { useState } from 'react';
import { AddToCartButtonImage } from '../types/image';
import styled from 'styled-components';

export const AddToCartButton = ({
  addToCartState,
  deleteCartState,
  id,
}: {
  addToCartState: () => void;
  deleteCartState: () => void;
  id: number;
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCartState();
  };

  const handleDeleteCart = () => {
    setIsAdded(false);
    deleteCartState();
  };

  return (
    <>
      {isAdded ? (
        <AddToCartCount id={id} onDeleteCart={handleDeleteCart} />
      ) : (
        <AddToCartButtonImageWrapper>
          <AddToCartButtonImage onClick={handleAddToCart} />
        </AddToCartButtonImageWrapper>
      )}
    </>
  );
};

const AddToCartButtonImageWrapper = styled.div`
  cursor: pointer;
`;
