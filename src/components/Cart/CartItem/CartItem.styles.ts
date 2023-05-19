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
`;

export const ProductName = styled.p`
  max-height: 54px;
  padding-top: 8px;

  font: ${(props) => props.theme.font.product};
`;

export const ProductOrderControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 12px;
`;

export const ProductPriceContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 96px;
  text-align: end;
`;

export const ProductPrice = styled.span`
  font: ${(props) => props.theme.font.product};
  font-weight: 700;
`;

export const SVGContainer = styled.div`
  display: flex;
  justify-content: end;
`;
