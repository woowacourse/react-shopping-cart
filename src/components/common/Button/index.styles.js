import styled from 'styled-components';

export const StyledButton = styled.button.attrs(({ onClick }) => ({ onClick }))`
  width: 100%;
  color: var(--color-white);
  font-size: var(--font-semi-large);
  font-weight: var(--weight-semi-bold);
  height: 2.7rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
