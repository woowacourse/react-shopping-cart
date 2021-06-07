import styled from "styled-components";
import { COLOR } from "../../constants/theme";

interface ButtonProps {
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  border?: string;
}

// Todo: csstype 고려하기
const Button = styled.button<ButtonProps>`
  ${({ width, height, color, fontSize, backgroundColor, border }) => `
      width: ${width ?? "100%"}; 
      height: ${height ?? "fit-content"}; 
      color: ${color ?? COLOR.BLACK};
      font-size:${fontSize ?? "1rem"};
      background-color: ${backgroundColor ?? "transparent"};
      border: ${border ? border : "none"};
    `}
  font-weight:700;
`;

export default Button;
export { ButtonProps };
