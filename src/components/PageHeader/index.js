import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './index.styles';

const PageHeader = ({ children }) => (
  <Header>
    <h1>{children}</h1>
  </Header>
);

PageHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PageHeader;
