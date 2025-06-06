import styled from "@emotion/styled";

export const ModalBackdrop = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.3);
  inset: 0;
  position: absolute;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
  padding: 24px 16px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  width: 100%;
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
