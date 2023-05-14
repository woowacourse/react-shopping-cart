import styled from 'styled-components';

export const StyledButton = styled.button<{
  width: string;
  height: string;
  padding: string;
  border: string;
  borderRadius: string;
  backgroundColor: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};

  padding: ${props => props.padding};

  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};

  background-color: ${props => props.backgroundColor};
`;
