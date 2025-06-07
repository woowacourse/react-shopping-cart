import styled from "@emotion/styled";

export const Container = styled.div`
  height: calc(100% - 150px);
  display: flex;
  flex-direction: column;
  padding: 36px 24px 0;
  gap: 12px;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
  flex: 1;
  min-height: 0;
`;

export const DeliveryInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ButtonWrap = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;
