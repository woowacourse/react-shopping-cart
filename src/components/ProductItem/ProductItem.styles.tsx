import styled from 'styled-components';

export const ProductItemWrapper = styled.div`
  width: 400px;
  padding: 47px;
`;

export const ImageContainer = styled.div`
  overflow: hidden;
`;

export const ProductItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductItemTitle = styled.span``;

export const ProductItemPrice = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
`;

export const ProductItemInfo = styled.div`
  width: 100%;
  padding: 18px 12px;
  background: #2c2c2d30;
`;

export const ProductItemInfoUpperBoundary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CartButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
