import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CouponListContainer = styled.div`
  width: 100%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 16px;
`;

export const CouponListContent = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const CouponListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
`;

export const CouponIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
`;

export const CouponLabel = styled.span`
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  padding-top: 25px;
`;

export const CouponContainer = styled.div<{ isInvalid: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px 0;

  color: ${({ isInvalid }) => (isInvalid ? 'rgba(0, 0, 0, 0.4)' : '#000')};
`;

export const CouponHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
`;

export const CouponInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  gap: 10px;
  padding-top: 10px;
`;

export const CouponListFooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UseCouponButton = styled.button`
  width: 100%;
  padding: 16px 0;
  background-color: #333333;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  font-style: 700;
  cursor: pointer;
  :hover {
    background-color: #000;
  }

  transition: background-color 0.2s ease;
`;

export const bestTwoCouponMessage = styled.div`
  font-size: 14px;
  color: blue;
  font-weight: 500;
`;

export const messageContainer = styled.div`
  font-size: 14px;
  color: red;
  font-weight: 500;
`;

export const CloseButtonCSS = css`
  width: 20px;
  height: 20px;
  font-size: 16px;
  border-radius: 3px;

  transition: background-color 0.2s ease;
  padding: 1px;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;

export const CouponButtonCSS = css`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;
