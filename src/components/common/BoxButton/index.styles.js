import styled, { css } from 'styled-components';

export const Button = styled.button.attrs(({ onClick }) => ({ onClick }))`
  width: 100%;
  color: var(--color-white);
  ${({ buttonStyle }) => {
    if (buttonStyle === 'brown-button') {
      return css`
        height: 2.7rem;
        background-color: var(--color-brown);
        font-size: var(--font-semi-large);
        font-weight: var(--weight-semi-bold);
      `;
    }
  }}
`;
