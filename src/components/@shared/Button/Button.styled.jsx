import styled, { css } from "styled-components";
import { COLOR } from "../../../constants/style";

const buttonStyle = {
  default: css`
    background-color: ${COLOR.CYAN[400]};

    &:hover {
      background-color: ${COLOR.CYAN[700]};
    }
  `,
  primary: css`
    background-color: ${COLOR.BROWN[400]};

    &:hover {
      background-color: ${COLOR.BROWN[700]};
    }
  `,
  secondary: css`
    border: 1px solid ${COLOR.GRAY[500]};
    background-color: white;

    color: ${COLOR.GRAY[800]};
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
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled,
  &:disabled:hover {
    background-color: ${COLOR.GRAY[600]};
    cursor: not-allowed;
  }

  ${({ theme }) => buttonStyle[theme]}
`;
