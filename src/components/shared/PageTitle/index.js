import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const PageTitle = ({ children }) => {
  return <Styled.TitleContainer>{children}</Styled.TitleContainer>;
};

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default React.memo(PageTitle);
