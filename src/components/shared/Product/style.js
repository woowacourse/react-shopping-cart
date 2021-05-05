import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  ${({ direction, size }) => (direction === 'column' ? `max-width: ${size}` : `max-height: ${size}`)};

  img {
    ${({ direction, size }) => direction === 'row' && `width: ${size};`}
    ${({ direction, size }) => (direction === 'column' ? 'margin-bottom: 1.5rem' : 'margin-right: 1.5rem')};
    background-color: ${PALETTE.BLACK_TRANSPARENT_005};
  }
`;
