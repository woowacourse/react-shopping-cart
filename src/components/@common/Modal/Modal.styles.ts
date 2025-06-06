import styled from "@emotion/styled";

export const ModalBackdrop = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  inset: 0;
  position: absolute;
`;

export const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 70%;
  overflow: hidden;
  margin: 0 24px;
  flex-direction: column;
  gap: 5px;
  padding: 24px 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
