import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorBoundary({children, fallback, error, pending}) {
  if (pending) return;

  if (error) return fallback;

  return <React.Fragment>{children}</React.Fragment>;
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
  fallback: PropTypes.any,
  error: PropTypes.boolean,
  pending: PropTypes.boolean,
};
