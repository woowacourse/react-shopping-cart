import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const Button = styled.button<{ css?: SerializedStyles }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 8px;
  background-color: #fff;
  border: 1px solid #0000001a;
  border-radius: 4px;
  cursor: pointer;
  ${({ css }) => css}

  &:disabled {
    background-color: #bebebebe;
    cursor: not-allowed;
  }
`;

export const ButtonIcon = styled.img`
  width: 15px;
  height: 15px;
`;

export const ButtonTitle = styled.span``;
