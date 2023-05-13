import styled from 'styled-components';

export const StyledStepperDiv = styled.div`
  display: grid;
  grid-template:
    'a a b' 20px
    'a a c' 20px
    /32px 32px 32px;
`;

export const StyledInput = styled.input`
  grid-area: a;

  border: 1px solid #dddddd;
  text-align: center;
`;

export const StyledButton = styled.button`
  border: 1px solid #dddddd;
  color: #333333;

  font-size: xx-small;
`;

export const StyledUpButton = styled(StyledButton)`
  grid-area: b;
`;

export const StyledDownButton = styled(StyledButton)`
  grid-area: c;
`;
