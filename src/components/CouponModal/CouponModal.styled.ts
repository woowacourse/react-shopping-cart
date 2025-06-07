import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
`;

export const ModalContainer = styled.div`
  position: fixed;
  width: 382px;
  height: auto;
  max-height: 70vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  overflow-y: auto;
  padding: 24px 16px;
  z-index: 1;
`;

export const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 22px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const XButton = styled.button`
  border: none;
  font-size: 20px;
`;

export const CloseButton = styled.button`
  width: 100%;
  height: 44px;
  color: white;
  background-color: rgba(51, 51, 51, 1);
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
  margin-top: 32px;
`;
