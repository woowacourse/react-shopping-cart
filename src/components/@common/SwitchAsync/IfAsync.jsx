import PropTypes from 'prop-types';
import React from 'react';

import Then from './Then';

function IfAsync({ isLoading, isError, isContentLoaded = true, children }) {
  const ThenComponent =
    React.Children.toArray(children).find(
      ({ type }) => typeof type === 'function' && type.name === Then.name,
    ) || null;

  if (!ThenComponent) {
    throw new Error('IfAsync 컴포넌트의 자식 요소로 Then 컴포넌트가 존재하지 않습니다.');
  }

  const {
    loading: LoadingComponent = <></>,
    error: ErrorComponent = <></>,
    children: SuccessComponent,
  } = ThenComponent.props;

  return (
    (isLoading && LoadingComponent) ||
    (isError && ErrorComponent) ||
    (!isLoading && !isError && isContentLoaded && SuccessComponent)
  );
}

IfAsync.defaultProps = {
  isLoading: false,
  isError: false,
  isContentLoaded: true,
};

IfAsync.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isContentLoaded: PropTypes.bool,
};

export default IfAsync;
