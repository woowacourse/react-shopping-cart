import styled from 'styled-components';

export const Sheet = styled.div`
  min-width: 16rem;
  max-width: 20rem;
  border: 1px solid var(--color-grey-50);
  background-color: white;
`;

export const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-50);
  font-weight: var(--weight-small);
`;

export const Content = styled.div`
  padding: 1rem;
`;

export const Payment = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  font-weight: var(--weight-bold);
  font-size: var(--font-small);
`;
