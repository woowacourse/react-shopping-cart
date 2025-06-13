import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CartItemHeader = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
`;

export const deleteButtonCSS = css`
  width: 40px;
  height: 28px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  &:hover {
    background-color: #f8f8f8;
    border-color: rgba(0, 0, 0, 0.2);
  }
`;
