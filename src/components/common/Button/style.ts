import styled from "styled-components";
import { ButtonProps } from "../../../types/button";
import { BUTTON_THEME, BUTTON_SIZE } from "../../../constants/button";

export const Wrapper = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $theme }) =>
    $theme ? BUTTON_THEME[$theme].backgroundColor : "transparent"};
  color: ${({ $theme }) => ($theme ? BUTTON_THEME[$theme].color : "inherit")};
  border: ${({ $theme }) => ($theme ? "1px solid rgba(0, 0, 0, 0.1)" : "none")};
  padding: 0;
  cursor: pointer;
  width: ${({ $size }) => ($size ? BUTTON_SIZE[$size].width : "fit-content")};
  height: ${({ $size }) => ($size ? BUTTON_SIZE[$size].height : "fit-content")};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "4px"};
`;
