import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const HighlightText = ({ highlightColor, children }) => {
  return <Styled.HighlightText highlightColor={highlightColor}>{children}</Styled.HighlightText>;
};

HighlightText.propTypes = {
  highlightColor: PropTypes.string,
  children: PropTypes.node,
};

HighlightText.defaultProps = {};

export default HighlightText;
