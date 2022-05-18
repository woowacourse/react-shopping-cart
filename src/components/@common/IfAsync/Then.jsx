import PropTypes from 'prop-types';

function Then({ loading, error, children }) {
  return <>{children}</>;
}

Then.propTypes = {
  loading: PropTypes.node.isRequired,
  error: PropTypes.node.isRequired,
};

export default Then;
