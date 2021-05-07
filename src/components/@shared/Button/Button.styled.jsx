import styled, { css } from "styled-components";
import { COLOR } from "../../../constants/style";

const buttonStyle = {
  default: css`
    background-color: ${COLOR.CYAN.PRIMARY};

    &:hover {
      background-color: ${COLOR.CYAN.DARK};
    }
  `,
  primary: css`
    background-color: ${COLOR.BROWN.PRIMARY};

    &:hover {
      background-color: ${COLOR.BROWN.DARK};
    }
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

  ${({ type }) => buttonStyle[type]}
`;
