import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './index.styles';

const Button = ({ children, onClick, buttonStyle = '' }) => (
  <ButtonWrapper>
    <button onClick={onClick} className={buttonStyle}>
      {children}
    </button>
  </ButtonWrapper>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonStyle: PropTypes.string,
};

export default Button;
