import styled from "styled-components";
import { COLOR } from "../../../constants/style";

export const NumberInput = styled.div`
  display: flex;
  height: 3.75rem;

  input {
    width: 4.5rem;
    text-align: center;
    font-size: 1.5rem;
    border: 1px solid ${COLOR.GRAY.LIGHT_300};
    border-right: 1px solid transparent;

    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
    }
  }

  div {
    display: flex;
    flex-direction: column;

    button {
      padding: 0;
      width: 2.5rem;
      font-size: 0.75rem;
      border: 1px solid ${COLOR.GRAY.LIGHT_300};
    }
  }
`;
