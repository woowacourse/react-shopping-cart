import styled from "@emotion/styled";

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const QuantityText = styled.span`
  color: #0a0d13;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

export const Button = styled.button`
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
`;
