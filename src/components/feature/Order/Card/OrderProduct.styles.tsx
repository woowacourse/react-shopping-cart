import styled from "@emotion/styled";

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const ImgSection = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 10px;
  object-fit: cover;
`;

export const ProductInfoSection = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ProductDescription = styled.div`
  display: flex;
  height: 90%;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

export const ProductDescriptionTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ProductName = styled.h3`
  font-size: 12px;
`;

export const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const OrderInfoText = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

export const ProductQuantity = styled.p`
  font-size: 12px;
  font-weight: 500;
`;
