import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  gap: 16px;
  border-top: 1px solid #0000001a;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;

  border-radius: 8px;
`;

export const Wrapper = styled.div`
  width: 100%;

  position: relative;
`;

export const ProductInfo = styled.div`
  width: 106px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProductName = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

export const Price = styled.p`
  font-weight: 500;
  font-size: 12px;
`;

export const DeleteButton = styled.button`
  padding: 6px 8px;
  color: #000000;
  background-color: transparent;
  border: 1px solid #0000001a;
  border-radius: 4px;

  position: absolute;
  top: 0;
  right: 0;

  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover,
  &:focus {
    background-color: #000000;
    color: #ffffff;
  }
`;
