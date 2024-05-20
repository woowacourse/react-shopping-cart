import styled from "styled-components";

import PlusButton from "@/assets/plus-button.svg?react";
import MinusButton from "@/assets/minus-button.svg?react";

import {
  disabledClickStyles,
  enabledClickStyles,
} from "./QuantityButton.styles";
import Button from "../Button/Button";

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

interface QuantityButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const QuantityPlusButton = ({
  onClick,
  disabled,
}: QuantityButtonProps) => {
  return (
    <Button
      theme="transparent"
      width="fit"
      onClick={onClick}
      disabled={disabled}
    >
      <StyledPlusButton disabled={disabled} />
    </Button>
  );
};

export const QuantityMinusButton = ({
  onClick,
  disabled,
}: QuantityButtonProps) => {
  return (
    <Button
      theme="transparent"
      width="fit"
      onClick={onClick}
      disabled={disabled}
    >
      <StyledMinusButton disabled={disabled} />
    </Button>
  );
};
