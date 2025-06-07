import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 20px;
`;

export const ItemInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: flex-start;
`;

export const CountContainer = styled.div`
  display: flex;
  gap: 4.5px;
  align-items: center;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ItemTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 250px;
`;

export const ItemPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const CountControlButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: white;
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

export const CartItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
`;
