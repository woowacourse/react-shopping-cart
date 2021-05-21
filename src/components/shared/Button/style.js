import styled, { css } from 'styled-components';
import { COLOR } from '../../../constants';

export const SIZE = {
  small: css`
    height: 50px;
    padding: 0 2rem;
    font-size: 1rem;
  `,
  medium: css`
    height: 74px;
    padding: 0 3rem;
    font-size: 1.5rem;
  `,
};

export const Container = styled.button`
  width: ${({ width }) => width};
  outline: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  cursor: pointer;
  color: ${({ color }) => color};

  ${({ size }) => SIZE[size]};

  &:hover {
    filter: brightness(0.8);
  }

  &:disabled {
    background-color: ${COLOR['GRAY-200']};
    cursor: default;
  }

  &:disabled:hover {
    filter: none;
  }
`;
