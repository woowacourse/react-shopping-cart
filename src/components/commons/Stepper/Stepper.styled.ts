import styled from 'styled-components';
import Colors from '../../../constants/Colors';

export const StepperDiv = styled.div`
  display: grid;
  grid-template:
    'a a b' 20px
    'a a c' 20px
    /32px 32px 32px;
`;

export const Input = styled.input`
  grid-area: a;

  border: 1px solid ${Colors.STEPPER_BORDER};
  text-align: center;
`;

export const Button = styled.button`
  border: 1px solid ${Colors.STEPPER_BORDER};
  color: ${Colors.PRIMARY_COLOR_DARK};

  font-size: xx-small;

  &:hover {
    background-color: ${Colors.STEPPER_BORDER};
  }
`;

export const UpButton = styled(Button)`
  grid-area: b;
`;

export const DownButton = styled(Button)`
  grid-area: c;
`;
