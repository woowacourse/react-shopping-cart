import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  font-size: var(--font-semi-large);
  font-weight: ${({ backgroundColor }) =>
    backgroundColor ? 'var(--weight-semi-bold)' : 'var(--weight-regular)'};
  height: 2.7rem;
  border: 1px solid
    ${({ backgroundColor }) => (backgroundColor ? '' : 'var(--color-grey-150)')};
  color: ${({ backgroundColor }) =>
    backgroundColor ? 'var(--color-white)' : 'var(--color-grey-500)'};
  background-color: ${({ backgroundColor }) => backgroundColor};

  &:disabled {
    background: var(--color-grey-200);
    cursor: default;
  }

  &:not(:disabled):hover {
    border: 1px solid var(--color-mint-500);
  }
`;
