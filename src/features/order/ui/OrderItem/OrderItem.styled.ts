import styled from '@emotion/styled';

export const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #e5e5e5;
  padding-top: 12px;
`;

export const ItemContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 16px;
`;

export const ItemImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  display: block;
  flex-shrink: 0;
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

export const ItemQuantity = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
