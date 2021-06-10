import styled, { css } from "styled-components";
import { COLOR } from "../../../constants/style";

const buttonStyle = {
  default: css`
    background-color: ${COLOR.CYAN_400};

    &:hover {
      background-color: ${COLOR.CYAN_700};
    }
  `,
  primary: css`
    background-color: ${COLOR.BROWN_400};

    &:hover {
      background-color: ${COLOR.BROWN_700};
    }
  `,
  secondary: css`
    border: 1px solid ${COLOR.GRAY_500};
    background-color: ${COLOR.WHITE};

    color: ${COLOR.GRAY_800};
  `,
};

export const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0.5rem;
  border: 0;
  font-size: 100%;
  color: ${COLOR.WHITE};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled,
  &:disabled:hover {
    background-color: ${COLOR.GRAY_600};
    cursor: not-allowed;
  }

  ${({ theme }) => buttonStyle[theme]}
`;
