import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

Button.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Button;
