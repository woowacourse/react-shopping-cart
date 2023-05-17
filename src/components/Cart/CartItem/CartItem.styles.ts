import { styled } from 'styled-components';

export const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 0px;
`;

export const ProductImage = styled.img`
  width: 144px;
  height: 147px;
`;

export const ProductNameConatiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-right: 20px;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
`;
export const ProductName = styled.p`
  max-height: 54px;
  padding-top: 8px;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;
  font: ${(props) => props.theme.font.product};
`;

export const ProductPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 96px;
  text-align: right;
  word-break: break-all;
  margin-right: 12px;
`;

export const ProductPrice = styled.span`
  font: ${(props) => props.theme.font.product};
  font-weight: 700;
`;
