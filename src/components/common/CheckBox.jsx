import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';

function CheckBox({ isClicked = true, boxSize = 30, labelText, onClickCallback = () => {} }) {
  const [clicked, setClicked] = useState();

  const handleClick = () => {
    setClicked((prev) => !prev);
    onClickCallback(!clicked);
  };

  useEffect(() => {
    setClicked(isClicked);
  }, [isClicked]);

  return (
    <StyledCheckBoxLayout onClick={handleClick}>
      {clicked ? <BsCheckSquareFill size={boxSize} /> : <BsSquare size={boxSize} />}
      <span>{labelText}</span>
    </StyledCheckBoxLayout>
  );
}

const StyledCheckBoxLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  &:hover {
    & > span {
      color: ${({ theme }) => theme.COLORS.LIGHT_PRIMARY};
    }
    color: ${({ theme }) => theme.COLORS.LIGHT_PRIMARY};
  }
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  & > span {
    color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export default CheckBox;
