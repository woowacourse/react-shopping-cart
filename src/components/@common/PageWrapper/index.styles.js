import styled from 'styled-components';

export const Page = styled.div`
  ${({ bg }) =>
    bg === 'grey'
      ? 'background-color: var(--color-background);'
      : 'background-color: var(--color-white);'}
  min-height: 100%;
  width: 100%;
`;

export const Container = styled.div`
  ${({ noPadding }) => (noPadding ? '' : 'padding: 7rem;')}
  min-width: 55rem;
  max-width: 65rem;
  margin: 0 auto;
`;
