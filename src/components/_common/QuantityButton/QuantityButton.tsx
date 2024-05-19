import styled from "styled-components";

import PlusButton from "@/assets/plus-button.svg?react";
import MinusButton from "@/assets/minus-button.svg?react";

import {
  disabledClickStyles,
  enabledClickStyles,
} from "./QuantityButton.styles";

export const StyledPlusButton = styled(PlusButton)<{ disabled: boolean }>`
  width: 25px;
  height: 25px;

  ${({ disabled }) => (disabled ? disabledClickStyles : enabledClickStyles)}
`;

export const StyledMinusButton = styled(MinusButton)<{ disabled: boolean }>`
  width: 25px;
  height: 25px;

  ${({ disabled }) => (disabled ? disabledClickStyles : enabledClickStyles)}
`;
