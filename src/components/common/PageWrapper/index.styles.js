import styled from 'styled-components';

export const Page = styled.div`
  ${({ bg }) =>
    bg === 'grey'
      ? 'background-color: var(--color-background);'
      : 'background-color: var(--color-white);'}
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  padding: 7rem;
  min-width: 55rem;
  max-width: 65rem;
  margin: 0 auto;
`;
