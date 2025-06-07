import { css } from '@emotion/react';
import { theme } from '../../styles';

export const CouponModalContainerStyle = css`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  max-width: 43rem;
`;

export const CouponModalContentStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 38.2rem;
  min-height: 20rem;
  padding: 2.4rem 3.2rem;
  width: 90%;
  border-radius: 8px;
  background-color: #fff;
`;

export const CouponModalCloseButtonStyle = css`
  position: absolute;
  top: 2.4rem;
  right: 3.2rem;
  cursor: pointer;
`;

export const CouponSelectDescriptionStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  margin: 3.2rem 0 1.6rem 0;
`;

export const CouponModalListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-height: 40rem;
  overflow-y: auto;
  width: 100%;
`;

export const CouponModalListItemStyle = css`
  padding-top: 1.2rem;
  width: 100%;
  border-top: 1px solid ${theme.color.gray1};
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const CouponModalListItemHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
`;

export const CouponModalListItemCheckboxStyle = css`
  width: 2.4rem;
  height: 2.4rem;
  accent-color: ${theme.color.black};
`;

export const CouponModalListItemDescriptionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.4rem;
`;

export const CouponModalConfirmButtonStyle = css`
  width: 100%;
  height: 4.8rem;
  margin-top: 3.2rem;
  background-color: ${theme.color.black};
  color: ${theme.color.white};
  border-radius: 8px;
`;
