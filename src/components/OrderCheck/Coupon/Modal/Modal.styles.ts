import styled from "@emotion/styled";

export const ModalBackground = styled.div<{
  isModalOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  visibility: hidden;
  visibility: ${({ isModalOpen }) => (isModalOpen ? "visible" : "hidden")};
  opacity: ${({ isModalOpen }) => (isModalOpen ? "1" : "0")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  margin: 0 auto;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 161px;
  width: 382px;
  height: 614px;
  background-color: white;
  gap: 32px;
  border-radius: 8px;
  padding: 24px 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 318px;
  height: 26px;
`;

export const ModalHeaderTitle = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

export const ModalHeaderCloseImg = styled.img`
  width: 14px;
  height: 14px;
`;
