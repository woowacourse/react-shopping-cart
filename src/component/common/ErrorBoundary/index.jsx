import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorBoundary({children, fallback, error, pending = false}) {
  if (pending) return;

  if (error) return fallback;

  return <>{children}</>;
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  error: PropTypes.bool,
  pending: PropTypes.bool,
};
