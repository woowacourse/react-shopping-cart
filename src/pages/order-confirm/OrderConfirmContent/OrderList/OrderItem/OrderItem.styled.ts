import styled from "@emotion/styled";

export const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #e5e5e5;
  padding-top: 12px;
`;

export const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 16px;
`;

export const ItemDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ItemDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #0a0d13;
`;

export const ItemPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const DeleteButton = styled.button`
  width: 46px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
`;

export const ItemQuantityText = styled.p`
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
`;
