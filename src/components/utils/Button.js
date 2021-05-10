import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 2px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor || 'inherit'};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
`;

function Button({ type = 'button', children, ...props }) {
  return (
    <StyledButton type={type} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
