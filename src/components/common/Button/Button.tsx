import theme from '@/styles/Theme';
import styled, { css, StyleProps } from 'styled-components';

const Button = styled.button`
  ${({
    backgroundColor = theme.brandColor_1,
    fontColor = theme.whiteColor_1,
    padding = '10px',
    border = 'none',
  }: Partial<Pick<StyleProps, 'backgroundColor' | 'fontColor' | 'padding' | 'border'>>) =>
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
