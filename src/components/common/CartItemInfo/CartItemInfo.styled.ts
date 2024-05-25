import styled from 'styled-components';

export const ItemName = styled.p`
  color: rgba(10, 13, 19, 1);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const ItemPrice = styled.p`
  color: rgba(0, 0, 0, 1);
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
`;

export const ItemImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

export const ItemQuantity = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const DetailContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`;
