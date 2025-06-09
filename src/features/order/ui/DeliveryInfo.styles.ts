import styled from '@emotion/styled';

export const DeliveryInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  margin: 20px 0;

  & > h2 {
    font-size: 16px;
    font-weight: 700;
  }
`;

export const SelectInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span {
    font-size: 12px;
    font-weight: 500;
  }
`;
