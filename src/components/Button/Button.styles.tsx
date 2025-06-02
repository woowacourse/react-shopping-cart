import styled from "@emotion/styled";

export const Button = styled.button<{ disabled: boolean }>`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  background-color: ${({ disabled }) => (disabled ? "rgba(0, 0, 0, 0.1)" : "black")};
  border-radius: 4px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: white;
`;
