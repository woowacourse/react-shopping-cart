import styled from 'styled-components';

export const Root = styled.main`
  display: flex;
  justify-content: space-between;
  gap: 5rem;

  @media (max-width: 1024px) {
    & {
      flex-direction: column;
    }
  }
`;
