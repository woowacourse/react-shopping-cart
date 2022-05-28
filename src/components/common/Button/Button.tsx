import theme from '@/styles/Theme';
import styled, { css, StyleProps } from 'styled-components';

const Button = styled.button`
  ${({
    width,
    backgroundColor = theme.brandColor_1,
    fontColor = theme.whiteColor_1,
    padding = 'none',
    border = 'none',
  }: Partial<Pick<StyleProps, 'width' | 'backgroundColor' | 'fontColor' | 'padding' | 'border'>>) =>
    css`
      width: ${width};
      background-color: ${backgroundColor};
      color: ${fontColor};
      padding: ${padding};
      border: ${border};

      &:hover {
        opacity: 0.7;
      }
    `}
  transition: opacity 0.2s;
  border-radius: 4px;
  cursor: pointer;

  font-size: 1rem;
`;

export default Button;
