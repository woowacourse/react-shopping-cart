import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Button = styled.button<{ isMaxStock?: boolean }>`
  border: 1px solid #0000001a;
  border-radius: 8px;
  width: 24px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ isMaxStock }) => (isMaxStock ? 0.5 : 1)};
  cursor: ${({ isMaxStock }) => (isMaxStock ? "not-allowed" : "pointer")};
`;
