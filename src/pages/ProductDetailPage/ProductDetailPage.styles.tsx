import styled from 'styled-components';

export const ProductDetailPage = styled.div`
  display: flex;
  width: 100%;
  min-height: ${({ theme }) => theme.PAGE_HEIGHT};
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
`;

export const ProductWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductImage = styled.img`
  width: 570px;
  height: 570px;
`;

export const ProductNameWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.TEXT_COLOR};
  font-weight: bold;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 0.5px;

  border-bottom: 4px solid ${({ theme }) => theme.GRAY_400};
  padding: 15px 35px 19px;
  margin-bottom: 34px;
`;

export const ProductName = styled.span``;

export const ProductPriceWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.TEXT_COLOR};
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  padding: 0 35px;
  margin-bottom: 57px;
`;

export const ProductPrice = styled.span``;

export const PriceLabel = styled.span``;
