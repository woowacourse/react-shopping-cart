import styled from "styled-components";
import { COLOR } from "../../../constants/style";

export const CheckBox = styled.label`
  input[type="checkbox"] {
    appearance: none;
    border: 1px solid ${COLOR.CYAN_700};
    border-radius: 2px;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:checked {
      background-color: ${COLOR.CYAN_700};
    }

    &:after {
      content: "✔";
      width: 100%;
      height: 100%;
      font-size: 1.25rem;
      color: ${COLOR.WHITE};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  span {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
