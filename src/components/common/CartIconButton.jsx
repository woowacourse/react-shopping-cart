import React, { useState, useEffect } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import styled from 'styled-components';

function CartIconButton({ product, onClickCallback, isInCart }) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(isInCart);
  }, [isInCart]);

  const handleClickCart = () => setIsClicked((prev) => !prev);

  return (
    <StyledIconButton
      onClick={() => {
        handleClickCart(product);
        onClickCallback({ tryAdd: !isClicked, product });
      }}
      clicked={isClicked ? 1 : 0}>
      <GiShoppingCart size={25} />
    </StyledIconButton>
  );
}

const StyledIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 16px;
  background: ${({ clicked, theme }) => (clicked ? theme.COLORS.LIGHT_PRIMARY : 'none')};
  color: ${({ clicked, theme }) => (clicked ? theme.COLORS.PRIMARY : 'black')};
  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.COLORS.PRIMARY};
  }
`;

export default CartIconButton;
