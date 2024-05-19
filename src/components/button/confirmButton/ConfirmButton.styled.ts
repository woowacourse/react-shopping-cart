import styled from "styled-components";
import { BUTTON_COLORS } from "../../../constants";

const backgroundColors = {
  [BUTTON_COLORS.LIGHT]: "rgba(190, 190, 190, 1)",
  [BUTTON_COLORS.DARK]: "rgba(0, 0, 0, 1)",
};

export const StyledConfirmButton = styled.button<{ mode: keyof typeof BUTTON_COLORS }>`
  width: 100%;
  height: 64px;
  top: 872px;
  padding: 24px 65px;
  background-color: ${({ mode }) => backgroundColors[mode]};
  border: none;
  border-radius: 0px;

  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 1);

  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
