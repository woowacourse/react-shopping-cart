import styled from 'styled-components';

export const StepperDiv = styled.div`
  display: grid;
  grid-template:
    'a a b' 20px
    'a a c' 20px
    /32px 32px 32px;
`;

export const Input = styled.input`
  grid-area: a;

  border: 1px solid #dddddd;
  text-align: center;
`;

export const Button = styled.button`
  border: 1px solid #dddddd;
  color: #333333;

  font-size: xx-small;
`;

export const UpButton = styled(Button)`
  grid-area: b;
`;

export const DownButton = styled(Button)`
  grid-area: c;
`;
