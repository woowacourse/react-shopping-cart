import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

export const ModalContent = styled.div`
  padding: 0 24px;
  flex: 1;
  overflow: auto;
`;

export const TitleSpacer = styled.div`
  height: 32px;
`;

export const CouponDescription = styled.div`
  margin-bottom: 0;
  color: #000;
  font-size: 12px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #ff4444;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

export const CouponList = styled.div`
  padding: 16px 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const CouponDivider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid #eee;
`;

export const CouponCheckbox = styled.input`
  margin-right: 12px;
  margin-top: 2px;
`;

export const CouponContent = styled.div`
  margin: 12px 0 0 0;
  flex: 1;
`;

export const CouponCheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  gap: 8px;
`;

export const CouponItem = styled.div<{ selected: boolean; disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  margin: 12px 0 24px 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const CouponName = styled.div<{ disabled?: boolean }>`
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? "#999" : "#000")};
`;

export const CouponExpiry = styled.div<{ disabled?: boolean }>`
  font-size: 12px;
  color: ${({ disabled }) => (disabled ? "#999" : "#000")};
  margin-bottom: 2px;
`;

export const CouponDetail = styled.div<{ disabled?: boolean }>`
  font-size: 12px;
  color: ${({ disabled }) => (disabled ? "#999" : "#000")};
  margin-bottom: 2px;
`;

export const ModalFooter = styled.div`
  padding: 24px 32px;
  display: flex;
  justify-content: center;
`;

export const ApplyButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#333333")};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 15px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#555")};
  }
`;
