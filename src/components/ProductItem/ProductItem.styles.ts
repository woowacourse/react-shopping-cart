import styled from 'styled-components';

export const ItemWrapper = styled.div`
  width: 224px;
  height: 320px;
`;

export const ItemImage = styled.img`
  width: 224px;
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
