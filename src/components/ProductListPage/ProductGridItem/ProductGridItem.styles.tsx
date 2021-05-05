import styled from 'styled-components';

export const ProductGridItem = styled.div`
  width: 282px;
  color: ${({ theme }) => theme.textColor};
`;

export const ProductThumbnail = styled.img`
  width: 100%;
  height: 282px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 16px;
`;

export const GridBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
`;

export const GridTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.span`
  line-height: 22px;
  margin-bottom: 5px;
`;

export const ProductPrice = styled.span`
  font-size: 20px;
`;

export const CartIcon = styled.img``;
