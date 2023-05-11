import { AddToCartCount } from './AddToCartCount';
import { useState } from 'react';
import { AddToCartButtonImage } from '../types/image';
import styled from 'styled-components';

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
