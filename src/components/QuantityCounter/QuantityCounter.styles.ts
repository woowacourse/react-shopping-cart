import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QuantityCounter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 80px;
  height: 24px;
  line-height: 26px;
`;

export const ButtonIcon = styled.img<{ $disabled: boolean }>`
  border: 1px solid #0000001a;
  border-radius: 8px;
  padding: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  user-select: none;
  -webkit-user-drag: none;

  &:active {
    border-color: rgb(230, 230, 230);
    background-color: #f0f0f0;
    transform: scale(0.95);
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.4;
      cursor: default;
      background-color: #f5f5f5;
      border-color: #e0e0e0;

      &:active {
        transform: none;
        border-color: #e0e0e0;
        background-color: #f5f5f5;
      }
    `}}
`;
