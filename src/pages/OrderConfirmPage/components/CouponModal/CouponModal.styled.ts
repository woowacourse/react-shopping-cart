import styled from "@emotion/styled";
import { Modal } from "@seo_dev/react-modal";

export const StyledModalContent = styled(Modal.Content)`
  padding: 24px 32px;
  gap: 32px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

export const ModalTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalMiddle = styled.div``;

export const CouponInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CouponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const CouponCard = styled.div<{ isUsable: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;

  ${({ isUsable }) => `
    & input {
      cursor:${isUsable ? "pointer" : "not-allowed"};
    }
    & span {
      color:${isUsable ? "#000" : "#ccc"};
    }
  `}
`;
