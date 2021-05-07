import styled, { css } from 'styled-components';

export const Button = styled.button.attrs(({ onClick }) => ({ onClick }))`
  width: 100%;
  color: var(--color-white);
  font-size: var(--font-semi-large);
  font-weight: var(--weight-semi-bold);
  height: 2.7rem;
  ${({ buttonStyle }) => {
    if (buttonStyle === 'brown-button') {
      return css`
        background-color: var(--color-brown);
      `;
    }
    if (buttonStyle === 'mint-button') {
      return css`
        background-color: var(--color-mint);
      `;
    }
  }}
`;
