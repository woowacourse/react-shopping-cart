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
  top: 135px;
  width: 382px;
  height: 620px;
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

export const ModalBody = styled.div`
  width: 318px;
  height: 432px;
  gap: 16px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const InfoImg = styled.img`
  width: 16px;
  height: 16px;
`;

export const InfoDescription = styled.span`
  font-weight: 500;
  font-size: 12px;
`;

export const CouponList = styled.div`
  width: 318px;
  height: 400px;
  gap: 24px;
`;

export const Item = styled.div<{ disabled?: boolean }>`
  width: 318px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: ${({ disabled }) => (disabled ? "#999" : "inherit")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "auto")};
`;

export const ItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ItemTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

export const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CouponInfo = styled.span`
  font-weight: 500;
  font-size: 12px;
`;

export const ModalButton = styled.button`
  width: 318px;
  height: 44px;
  gap: 12px;
  border-radius: 8px;
  background-color: #333333;
  color: #ffffff;
`;
