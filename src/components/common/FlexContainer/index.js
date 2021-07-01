import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './style';

const FlexContainer = ({
  width,
  height,
  padding,
  margin,
  backgroundColor,
  border,
  direction,
  align,
  justifyContent,
  children,
}) => {
  return (
    <Styled.FlexContainer
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      backgroundColor={backgroundColor}
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
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justifyContent: PropTypes.string,
  children: PropTypes.any,
};

export default React.memo(FlexContainer);
