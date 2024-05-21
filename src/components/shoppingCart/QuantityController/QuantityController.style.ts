import styled from '@emotion/styled';
import {
  IncreaseIcon,
  IncreaseIconDisabled,
  DecreaseIcon,
  DecreaseIconDisabled,
} from '../../../assets';
import { QuantityControlType } from '../../../type';

export const QuantityControllerContainer = styled.div({
  width: '80px',
  heigth: '24px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  $controlType: QuantityControlType;
}

export const QuantityControlButton = styled.button<ButtonProps>(({ $controlType }) => ({
  width: '24px',
  height: '24px',
  border: '1px solid #dfdfdf',
  borderRadius: '8px',
  background: `url("${$controlType === 'increase' ? IncreaseIcon : DecreaseIcon}") no-repeat center`,
  cursor: `pointer`,

  '&:disabled': {
    background: `url("${$controlType === 'increase' ? IncreaseIconDisabled : DecreaseIconDisabled}") no-repeat center`,
    cursor: 'default',
  },
}));
