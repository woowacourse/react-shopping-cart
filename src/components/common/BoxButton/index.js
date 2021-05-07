import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './index.styles';

const BoxButton = ({ children, onClick, buttonStyle = '' }) => (
  <Button onClick={onClick} buttonStyle={buttonStyle}>
    {children}
  </Button>
);

BoxButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonStyle: PropTypes.string,
};

export default BoxButton;
