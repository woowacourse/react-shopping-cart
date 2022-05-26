import styled, { css } from 'styled-components';

export const ProductListStyled = styled.div(css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 5.5vh 14vw 0;
  overflow-y: auto;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`);

export const LoadingWrapperStyled = styled.div(css`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`);
