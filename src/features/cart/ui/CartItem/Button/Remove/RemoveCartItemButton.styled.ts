import styled from "@emotion/styled";

export const Button = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 24px;
  margin-bottom: 0.2rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
`;
