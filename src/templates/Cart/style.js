import styled, { css } from 'styled-components';

export const CartStyled = styled.div(css`
  width: 70vw;
  min-width: 800px;
  height: 100vh;
`);

export const CartProductInfoStyled = styled.div(css`
  width: 38vw;
  min-width: 440px;
  height: 100%;
  margin: 50px 2vw 0 0;
`);

export const CartProductContentStyled = styled.div(css`
  width: 38vw;
  min-width: 400px;
  margin-bottom: 30px;
`);

export const CartProductStyled = styled.div(css`
  width: 38vw;
  min-width: 400px;
  height: 200px;
  display: grid;
  grid-template-columns: 0.3fr 1.5fr 3fr 1fr;
  padding: 20px 0;
  border-bottom: 1px solid black;
`);

export const CartProductCountWrapperStyled = styled.div(css`
  width: 116px;
  height: 60px;
  display: flex;
`);

export const CartProductPriceStyled = styled.div(css`
  width: 30vw;
  min-width: 300px;
  height: 100%;
  margin-top: 50px;
`);

export const CartProductPriceWrapperStyled = styled.div(css`
  width: 28vw;
  min-width: 310px;
  height: 318px;
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  justify-content: space-around;
  align-content: center;
`);
