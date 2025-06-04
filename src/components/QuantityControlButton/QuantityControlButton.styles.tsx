import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ControlButton = css`
  padding: 0;
  border-radius: 8px;
  border: 1.5px solid #e5e5e5;
  width: 20px;
  height: 20px;
  background: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ControlButtonText = css`
  width: 100%;
  font-size: 24px;
  color: #222;
  text-align: center;
`;

export const QuantityText = css`
  width: 24px;
  text-align: center;
`;
