import styled from "styled-components";

import Checked from "@/assets/checked.svg?react";
import NotChecked from "@/assets/not-checked.svg?react";

import { disabledClickStyles } from "../QuantityButton/QuantityButton.styles";
import Button from "../Button/Button";

interface CheckBoxProps {
  isChecked: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const CheckBox = ({ isChecked, disabled, onClick }: CheckBoxProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      role="checkbox"
      width="fit"
      theme="transparent"
    >
      {disabled && (isChecked ? <DisabledCheckedBox /> : <NotChecked />)}
      {!disabled && (isChecked ? <Checked /> : <NotChecked />)}
    </Button>
  );
};

export default CheckBox;

export const DisabledCheckedBox = styled(Checked)`
  height: 25px;
  width: 25px;

  ${disabledClickStyles}
`;
