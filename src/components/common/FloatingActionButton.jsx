import React from 'react';
import styled from 'styled-components';
import { GiShoppingCart } from 'react-icons/gi';

function FloatingActionButton({ count }) {
  return (
    <StyledContainer>
      <StyledFabBox>
        <GiShoppingCart size={60} color={'#fff'} />
        <StyledCountBox>
          <span>{count}</span>
        </StyledCountBox>
      </StyledFabBox>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  right: 10%;
  bottom: 10%;
  cursor: pointer;
`;

const StyledFabBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 100%;
  box-shadow: 8px 8px 8px #00000080;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledCountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 16%;
  right: 16%;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  background: ${({ theme }) => theme.COLORS.WHITE};
  border: 4px solid ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 100%;
  animation: smoothAppear 1s 0s ease;
  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default FloatingActionButton;
