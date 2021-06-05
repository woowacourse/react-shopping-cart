import styled from 'styled-components';

export const Page = styled.div`
  ${({ bg }) =>
    bg === 'grey'
      ? 'background-color: var(--color-background);'
      : 'background-color: var(--color-white);'}
  min-height: 100%;
  width: 100%;
  padding: 7rem;
  margin: 0 auto;

  @media (max-width: 960px) {
    padding: 7rem 4rem;
    min-width: 35rem;
  }

  @media (max-width: 768px) {
    padding: 7rem 1rem;
    min-width: 25rem;
  }
`;

export const Container = styled.div`
  ${({ noPadding }) => (noPadding ? '' : 'padding: 7rem;')}
  max-width: 65rem;
  margin: 0 auto;
`;
