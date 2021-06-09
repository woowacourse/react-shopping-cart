import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './style';

const Loader = ({ isLoading, animationType, children }) => {
  return <>{isLoading && <Styled.LoaderContainer animationType={animationType}>{children}</Styled.LoaderContainer>}</>;
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  animationType: PropTypes.oneOf(['spin']),
  children: PropTypes.node,
};

export default Loader;
