import styled from 'styled-components';

import PALETTE from '../../../constants/palette';

export const ProductName = styled.p``;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  ${({ direction, size }) => (direction === 'column' ? `max-width: ${size}` : `max-height: ${size}`)};

  ${ProductName} {
    font-size: 1.25rem;
    margin-bottom: ${({ direction }) => (direction === 'column' ? '0.5rem' : '0.75rem')};
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${PALETTE.GRAY_007};

  ${({ direction }) =>
    direction === 'column'
      ? ` 
        width: 100%;
        padding-top: 100%;      
        margin-bottom: 1.5rem;
      `
      : `
        height: 8rem;
        width: 8rem;
      `}
`;

export const ProductImage = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;

  ${({ onClick }) =>
    onClick &&
    `
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  `}
`;

export const ProductDetail = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
  color: ${({ color }) => (color ? color : PALETTE.BLACK)};
`;
