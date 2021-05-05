import Styled, { css } from 'styled-components';

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

export const ProductContainer = Styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};

  img {
    ${({ size }) => imgSize[size]}
  }
`;
