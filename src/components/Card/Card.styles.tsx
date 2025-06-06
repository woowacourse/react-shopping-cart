import styled from "@emotion/styled";

export const CardWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 8px 0;
`;

export const CardImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
