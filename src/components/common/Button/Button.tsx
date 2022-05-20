import styled, { css } from 'styled-components';
interface ButtonStyleProp {
  backgroundColor?: string;
  fontColor?: string;
  padding?: string;
  border?: string;
}
const Button = styled.button<ButtonStyleProp>`
  ${({
    theme,
    backgroundColor = theme.brandColor_1,
    fontColor = theme.whiteColor_1,
    padding = '10px',
    border = 'none',
  }) =>
    css`
      background-color: ${backgroundColor};
      color: ${fontColor};
      padding: ${padding};
      border: ${border};
    `}

  border-radius: 4px;
  cursor: pointer;
`;

export default Button;
