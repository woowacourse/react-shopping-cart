import styled from 'styled-components';

export const StyledButton = styled.button<{
  buttonSize: string;
  buttonColor: string;
  fontSize: string;
  fontColor: string;
}>`
  border: 1px solid #dddddd;
  background-color: ${props => props.buttonColor};

  font-size: ${props => props.fontSize};
  color: ${props => props.fontColor};
`;
