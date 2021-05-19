import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const ProductName = styled.p``;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  ${({ direction, size }) => (direction === 'column' ? `max-width: ${size}` : `max-height: ${size}`)};

  img {
    ${({ direction, size }) => direction === 'row' && `width: ${size};`}
    ${({ direction, size }) => (direction === 'column' ? 'margin-bottom: 1.5rem' : 'margin-right: 1.5rem')};
    background-color: ${PALETTE.BLACK_TRANSPARENT_005};
  }

  ${ProductName} {
    font-size: 1.25rem;
    margin-bottom: ${({ direction }) => (direction === 'column' ? '0.5rem' : '0.75rem')};
  }
`;

export const ProductDetail = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
  color: ${({ color }) => (color ? color : PALETTE.BLACK)};
`;
