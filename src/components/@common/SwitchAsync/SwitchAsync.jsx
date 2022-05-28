import PropTypes from 'prop-types';
import React from 'react';

import ErrorCase from './ErrorCase';
import LoadingCase from './LoadingCase';
import SuccessCase from './SuccessCase';

function SwitchAsync({ isLoading, isError, isContentLoaded = true, children }) {
  return (
    <>
      {React.Children.toArray(children).find((targetComponent) => {
        const { type } = targetComponent;
        const componentName = typeof type === 'function' ? type.name : type;

        if (isLoading && componentName === LoadingCase.name) return true;
        if (isError && componentName === ErrorCase.name) return true;

        if (!isLoading && !isError && isContentLoaded && componentName === SuccessCase.name) {
          return true;
        }

        return false;
      })}
    </>
  );
}

SwitchAsync.defaultProps = {
  isLoading: false,
  isError: false,
  isContentLoaded: true,
};

SwitchAsync.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isContentLoaded: PropTypes.bool,
};

export default SwitchAsync;
