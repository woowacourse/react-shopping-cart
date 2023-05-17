import styled from 'styled-components';

export const Container = styled.div``;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  color: #333333;
  border-bottom: 2px solid #333333;
  padding-bottom: 30px;
`;

export const ProductAmount = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #333333;
  margin: 34px 0px 15px 0px;
`;

export const ShoppingCartContentsLayout = styled.div`
  display: grid;
  grid-template-columns: auto 360px;
  column-gap: 100px;
`;
