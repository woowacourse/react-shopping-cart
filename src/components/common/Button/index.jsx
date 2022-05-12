import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Button;
