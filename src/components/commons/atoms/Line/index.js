import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const Line = (props) => {
  const { length, thickness, color, ...rest } = props;

  return <Styled.Line length={length} thickness={thickness} color={color} {...rest} />;
};

Line.propTypes = {
  length: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  thickness: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Line.defaultProps = {
  width: '100%',
  thickness: '0.25rem',
  color: '#000000',
};
