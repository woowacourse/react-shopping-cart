import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const operatorButtonStyle = css`
  background-color: inherit;
  border: 1px solid #dddddd;
  width: 2.5rem;
  height: 2rem;
  img {
    object-fit: contain;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const NumberInputButtonContainer = styled.div`
  display: flex;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  text-align: right;
  border: 1px solid #dddddd;
  width: 4.5rem;
  height: 4rem;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
