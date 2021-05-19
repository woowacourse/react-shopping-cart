import styled from 'styled-components';

export const Sheet = styled.div`
  max-width: 20rem;
  border: 1px solid var(--color-grey-50);
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

  & > div {
    position: relative;
  }
`;

export const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 5px;
  opacity: 0.7;
  background-color: var(--color-mint);
  position: absolute;
  top: 1rem;
  left: 0;
  z-index: -1;
`;
