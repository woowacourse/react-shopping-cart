import styled from "styled-components";
import { COLOR } from "../../../constants/style";
import SCREENS from "../../../constants/screens";
import { Button } from "../Button/Button.styled";

export const NumberInput = styled.div`
  display: flex;
  height: 3.5rem;

  input {
    width: 3.5rem;
    height: 100%;
    text-align: center;
    font-size: 1.25rem;
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
    height: 100%;

    & > ${Button} {
      height: 50%;
      padding: 0;
      width: 2.5rem;
      font-size: 0.75rem;
      border: 1px solid ${COLOR.GRAY.LIGHT_300};
    }
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    height: 3.75rem;

    input {
      width: 4.5rem;
      font-size: 1.5rem;
    }
  }
`;
