import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const PageTitle = ({ title }) => {
  return <Styled.TitleContainer>{title}</Styled.TitleContainer>;
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
