import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Checkbox = styled.div<{ $disabled: boolean }>`
  width: 24px;
  height: 24px;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  ${({ $disabled }) =>
    !$disabled &&
    css`
      &:active {
        transform: scale(0.95);
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.8;
    `}
`;
