import styled from 'styled-components';

export const ItemWrapper = styled.div`
  width: 282px;
  height: 360px;
`;

export const ItemImage = styled.img`
  width: 282px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductName = styled.p`
  font: ${(props) => props.theme.font.product};
`;

export const ProductPrice = styled.p`
  font: ${(props) => props.theme.font.price};
`;
