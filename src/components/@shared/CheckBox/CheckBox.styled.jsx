import styled from "styled-components";
import { COLOR } from "../../../constants/style";
import SCREENS from "../../../constants/screens";

export const CheckBox = styled.input`
  appearance: none;
  border: 1px solid ${COLOR.CYAN.DARK};
  border-radius: 2px;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:checked {
    background-color: ${COLOR.CYAN.DARK};
  }

  &:after {
    content: "✔";
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
      font-size: 1.25rem;
    }
  }
`;
