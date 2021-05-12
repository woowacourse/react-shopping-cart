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

  &:hover {
    color: #ffffff;
    background-color: #2ac1bc;
    border: 1px solid #2ac1bc;
    cursor: pointer;
  }

  &:disabled {
    background-color: ${(props) => props.backgroundColor || 'inherit'};
    border: ${(props) => props.border};
    color: ${(props) => props.color};
    cursor: not-allowed;
  }
`;

function Button({ type = 'button', children, onClick, disabled, ...props }) {
  return (
    <StyledButton type={type} {...props} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

export default Button;
