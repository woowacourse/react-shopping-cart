import {
  DecreaseIcon,
  DecreaseIconDisabled,
  IncreaseIcon,
  IncreaseIconDisabled,
} from '../../assets';

import styled from '@emotion/styled';

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
  $controlType: 'increase' | 'decrease';
  $isEnabled: boolean;
}

const buttonBackgroundMatcher = ({ $controlType, $isEnabled }: ButtonProps) => {
  if ($controlType === 'increase') {
    return $isEnabled ? IncreaseIcon : IncreaseIconDisabled;
  }
  if ($controlType === 'decrease') {
    return $isEnabled ? DecreaseIcon : DecreaseIconDisabled;
  }
};

export const QuantityControlButton = styled.button<ButtonProps>(({ $controlType, $isEnabled }) => ({
  width: '24px',
  height: '24px',
  border: '1px solid #dfdfdf',
  borderRadius: '8px',
  background: `url("${buttonBackgroundMatcher({ $controlType, $isEnabled })}") no-repeat center`,
  cursor: $isEnabled ? `pointer` : 'inherit',
}));
