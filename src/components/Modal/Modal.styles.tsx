import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 24px 16px;
  width: 90%;
  max-width: 600px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80%;
  margin: 0 auto;
`;

export const ModalTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitleLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 24px 0;
`;

export const CompleteButton = styled.button`
  border-radius: 5px;
  background: #333;
  width: 100%;
  height: 44px;
  font-size: 15px;
  text-align: center;
  color: #fff;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 24px;
  font-family: 'Noto Sans KR';
  font-size: 16px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ReceiptTextWrapper = styled.p`
  display: flex;
  align-items: center;
`;

export const CouponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
