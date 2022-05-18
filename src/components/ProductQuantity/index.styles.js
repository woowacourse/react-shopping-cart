import styled from "styled-components";

export const ProductQuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const ProductCheckBox = styled.input`
  display: block;
  width: 28px;
  height: 28px;
`;

export const ProductImage = styled.img`
  width: 145px;
  height: 145px;
  object-fit: contain;
`;

export const ProductTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

export const ProductQuantityControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

export const QuantityButtonControlContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProductQuantity = styled.p`
  font-size: 24px;
  line-height: 18.67px;
  letter-spacing: 0.5px;
  padding: 23px 30px;
  border: 1px solid #ddd;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const QuantityButton = styled.button`
  border: 1px solid #ddd;
  padding: 6px 15px;
`;

export const ProductPrice = styled.p`
  text-align: center;
`;
