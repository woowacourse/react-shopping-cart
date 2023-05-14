import styled from 'styled-components';

export const StyledButton = styled.button<{
  width: string;
  height: string;
  backgroundColor: string;
  fontSize: string;
  color: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 1px solid #dddddd;
  background-color: ${props => props.backgroundColor};

  font-size: ${props => props.fontSize};
  color: ${props => props.color};
`;
