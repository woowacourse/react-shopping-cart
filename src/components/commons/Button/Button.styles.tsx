import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { Props } from './Button';

type ButtonProps = Omit<Props, 'children'>;

const BUTTON_SIZE = {
  LG: {
    fontSize: '32px',
    width: '638px',
    height: '98px',
  },
  MD: {
    fontSize: '24px',
    width: '388px',
    height: '73px',
  },
  SM: {
    fontSize: '20px',
    width: '138px',
    height: '47px',
  },
};

export const Button = styled.button<ButtonProps>(({ size, fontColor, backgroundColor, disabled }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: fontColor,
  backgroundColor: disabled ? COLORS.GRAY_300 : backgroundColor,
  cursor: disabled ? 'not-allowed' : 'pointer',
  ...BUTTON_SIZE[size],
}));
