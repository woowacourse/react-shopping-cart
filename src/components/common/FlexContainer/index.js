import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const FlexContainer = ({ width, height, padding, margin, border, direction, align, justifyContent, children }) => {
  return (
    <Styled.FlexContainer
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      border={border}
      direction={direction}
      align={align}
      justifyContent={justifyContent}
    >
      {children}
    </Styled.FlexContainer>
  );
};

FlexContainer.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  border: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justifyContent: PropTypes.string,
  children: PropTypes.any,
};

export default FlexContainer;
