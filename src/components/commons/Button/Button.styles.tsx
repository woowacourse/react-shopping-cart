import styled, { css } from 'styled-components';
import { COLORS } from '../../../constants';
import { Props } from './Button';

type ButtonProps = Omit<Props, 'children'>;

const BUTTON_SIZE = {
  LG: css`
    font-size: 32px;
    width: 638px;
    height: 98px;
  `,
  MD: css`
    font-size: 24px;
    width: 388px;
    height: 73px;
  `,
  SM: css`
    font-size: 20px;
    width: 138px;
    height: 47px;
  `,
};

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ fontColor }: ButtonProps) => fontColor};
  background-color: ${({ backgroundColor }: ButtonProps) => backgroundColor};
  cursor: pointer;
  ${({ size }: ButtonProps) => BUTTON_SIZE[size]}
  &:disabled {
    background-color: ${() => COLORS.GRAY_300};
    cursor: not-allowed;
  }
`;
