import styled, { css } from 'styled-components';
import PALETTE from '../../../constants/palette';

const imgSize = {
  xs: css`
    width: 7.5rem;
    height: 7.5rem;
  `,
  sm: css`
    width: 9rem;
    height: 9rem;
  `,
  md: css`
    width: 17.5rem;
    height: 17.5rem;
  `,
  lg: css`
    width: 35.5rem;
    height: 35.5rem;
  `,
};

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};

  img {
    background-color: ${PALETTE.BLACK_TRANSPARENT_005};
    ${({ size }) => imgSize[size]}
  }
`;
