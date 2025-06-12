import styled from '@emotion/styled';

export const ReviewCartItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 12px 0;

  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const ReviewCartItemContent = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  gap: 25px;
`;

export const ReviewCartItemImage = styled.img`
  width: 112px;
  height: 112px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ReviewCartItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ReviewCartItemInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ReviewCartItemInfoName = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const ReviewCartItemInfoPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

export const ReviewCartItemInfoQuantity = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
