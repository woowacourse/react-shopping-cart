import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const FlexContainer = ({ border, direction, align, justifyContent, children }) => {
  return (
    <Styled.FlexContainer border={border} direction={direction} align={align} justifyContent={justifyContent}>
      {children}
    </Styled.FlexContainer>
  );
};

FlexContainer.propTypes = {
  border: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justifyContent: PropTypes.string,
  children: PropTypes.any,
};

export default FlexContainer;
