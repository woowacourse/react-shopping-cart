import { css } from '@emotion/react';

export const CartItemStyle = css`
  border-top: 1px solid #e0e0e0;
  list-style: none;
  padding-top: 1.2rem;
`;

export const ListItemHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CheckboxStyle = css`
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
`;

export const DeleteButtonStyle = css`
  width: 4rem;
  height: 2.4rem;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
`;

export const ImageStyle = css`
  width: 11.2rem;
  height: 11.2rem;
  border-radius: 0.8rem;
  object-fit: cover;
`;

export const CartInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.9rem 0;
  width: 100%;
`;

export const CartItemBodyStyle = css`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.4rem;
  width: 100%;
`;

export const ControllerBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 2.4rem;
`;

export const ControllerButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
`;
