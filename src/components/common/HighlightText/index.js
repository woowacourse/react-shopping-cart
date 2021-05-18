import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const HighlightText = ({ highlightColor, fontSize, margin, children }) => {
  return (
    <Styled.HighlightText fontSize={fontSize} highlightColor={highlightColor} margin={margin}>
      {children}
    </Styled.HighlightText>
  );
};

HighlightText.propTypes = {
  highlightColor: PropTypes.string,
  fontSize: PropTypes.string,
  margin: PropTypes.string,
  children: PropTypes.node,
};

HighlightText.defaultProps = {
  fontSize: '1rem',
};

export default HighlightText;
