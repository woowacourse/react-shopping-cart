import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  ${({ direction, size }) => (direction === 'column' ? `max-width: ${size}` : `max-height: ${size}`)};

  img {
    background-color: ${PALETTE.BLACK_TRANSPARENT_005};
  }
`;
