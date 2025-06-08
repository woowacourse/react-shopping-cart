import styled from "@emotion/styled";

export const Button = styled.button`
  border: none;

  width: 24px;
  height: 24px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Icon = styled.img`
  width: auto;
  height: auto;
`;
