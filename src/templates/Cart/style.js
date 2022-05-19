import styled, { css } from 'styled-components';

export const CartStyled = styled.div(css`
  width: 70vw;
  height: 100vh;
  margin: 0 1.7vw 2.5vh;
`);

export const CartProductInfoStyled = styled.div(css`
  width: 38vw;
  height: 100%;
  margin: 50px 2vw 0 0;
`);

export const CartProductContentStyled = styled.div(css`
  width: 38vw;
  margin-bottom: 30px;
`);

export const CartProductStyled = styled.div(css`
  width: 38vw;
  height: 200px;
  display: flex;
  justify-content: space-around;
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
  height: 100%;
  margin-top: 50px;
`);

export const CartProductPriceWrapperStyled = styled.div(css`
  width: 28vw;
  height: 318px;
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  justify-content: space-around;
  align-content: center;
`);
