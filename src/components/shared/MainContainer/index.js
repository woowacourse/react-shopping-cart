import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const MainContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

MainContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainContainer;
